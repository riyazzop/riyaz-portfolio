"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModeStore } from "@/lib/store";
import { executeCommand, getAutocompleteSuggestions } from "./CommandHandler";
import dynamic from "next/dynamic";

// Dynamically import heavy components
const MatrixRain = dynamic(() => import("./MatrixRain"), { ssr: false });
const SnakeGame = dynamic(() => import("./SnakeGame"), { ssr: false });
const GlobalParticles = dynamic(
  () => import("@/components/Three/GlobalParticles"),
  { ssr: false },
);

const ASCII_BANNER = `
╔════════════════════════════════════════════════╗
║                                                ║
║     ██████╗ ██╗██╗   ██╗ █████╗ ███████╗       ║
║     ██╔══██╗██║╚██╗ ██╔╝██╔══██╗╚══███╔╝       ║
║     ██████╔╝██║ ╚████╔╝ ███████║  ███╔╝        ║
║     ██╔══██╗██║  ╚██╔╝  ██╔══██║ ███╔╝         ║
║     ██║  ██║██║   ██║   ██║  ██║███████╗       ║ 
║     ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝       ║
║                                                ║
║            Full-Stack Developer                ║
║               AI Enthusiast                    ║
║                                                ║
╚════════════════════════════════════════════════╝

Welcome to my interactive portfolio!
Type 'help' to see available commands.
`;

interface OutputLine {
  id: number;
  content: string;
  type: "input" | "output" | "error" | "success" | "banner";
}

// Simple typing sound using Web Audio API
const playTypingSound = () => {
  try {
    const audioContext = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800 + Math.random() * 200;
    oscillator.type = "square";

    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.05,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch {
    // Silently fail if audio isn't available
  }
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);

  const {
    currentPath,
    commandHistory,
    addToHistory,
    setCurrentPath,
    soundEnabled,
    toggleSound,
  } = useModeStore();

  // Initialize with banner
  useEffect(() => {
    setOutput([
      {
        id: lineIdRef.current++,
        content: ASCII_BANNER,
        type: "banner" as const,
      },
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on click
  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = useCallback(
    async (cmd: string) => {
      const trimmedCmd = cmd.trim();
      if (!trimmedCmd) return;

      // Add input to output
      setOutput((prev) => [
        ...prev,
        {
          id: lineIdRef.current++,
          content: `riyaz@portfolio:${currentPath}$ ${trimmedCmd}`,
          type: "input",
        },
      ]);

      // Add to history
      addToHistory(trimmedCmd);
      setHistoryIndex(-1);

      // Special commands for interactive features
      if (trimmedCmd.toLowerCase() === "matrix") {
        setShowMatrix(true);
        setInput("");
        return;
      }

      if (
        trimmedCmd.toLowerCase() === "game snake" ||
        trimmedCmd.toLowerCase() === "snake"
      ) {
        setShowSnake(true);
        setInput("");
        return;
      }

      if (
        trimmedCmd.toLowerCase() === "sound" ||
        trimmedCmd.toLowerCase() === "sound toggle"
      ) {
        toggleSound();
        setOutput((prev) => [
          ...prev,
          {
            id: lineIdRef.current++,
            content: `Typing sounds ${!soundEnabled ? "enabled" : "disabled"}`,
            type: "success" as const,
          },
        ]);
        setInput("");
        return;
      }

      // Execute command
      const result = await executeCommand(
        trimmedCmd,
        currentPath,
        setCurrentPath,
      );

      // Handle clear command
      if (result.clear) {
        setOutput([]);
        setInput("");
        return;
      }

      // Add output
      if (result.output) {
        const lines = result.output.split("\n").map((line) => ({
          id: lineIdRef.current++,
          content: line,
          type: result.type || "output",
        }));
        setOutput((prev) => [...prev, ...(lines as OutputLine[])]);
      }

      setInput("");
      setSuggestions([]);
    },
    [currentPath, addToHistory, setCurrentPath, soundEnabled, toggleSound],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleCommand(input);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex < commandHistory.length - 1
              ? historyIndex + 1
              : historyIndex;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const completions = getAutocompleteSuggestions(input);
        if (completions.length === 1) {
          setInput(completions[0]);
          setSuggestions([]);
        } else if (completions.length > 1) {
          setSuggestions(completions);
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setOutput([]);
      } else if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        setOutput((prev) => [
          ...prev,
          {
            id: lineIdRef.current++,
            content: `riyaz@portfolio:${currentPath}$ ${input}^C`,
            type: "input",
          },
        ]);
        setInput("");
      }
    },
    [input, commandHistory, historyIndex, handleCommand, currentPath],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSuggestions([]);
    // Play typing sound if enabled
    if (soundEnabled) {
      playTypingSound();
    }
  };

  const handleSnakeExit = (score: number) => {
    setShowSnake(false);
    setOutput((prev) => [
      ...prev,
      {
        id: lineIdRef.current++,
        content: `Game over! Final score: ${score}`,
        type: "success" as const,
      },
    ]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      {/* Matrix Rain Overlay */}
      <AnimatePresence>
        {showMatrix && <MatrixRain onExit={() => setShowMatrix(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-transparent p-2 sm:p-4 terminal relative z-10"
        onClick={handleContainerClick}
      >
        <div className="w-full h-full bg-black/20 backdrop-blur-sm overflow-hidden rounded-lg border border-gray-800 relative">
          <GlobalParticles className="absolute inset-0 pointer-events-none z-0" />
          {/* Title bar - Linux style */}
          <div className="bg-black/40 px-4 py-2 flex items-center justify-between border-b border-gray-800 relative z-10">
            <span className="text-gray-400 text-sm font-medium tracking-wide">
              riyaz@portfolio: ~{currentPath.replace("/home/riyaz", "")}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSound();
              }}
              className={`text-xs px-2 py-1 rounded ${
                soundEnabled
                  ? "bg-green-900 text-green-400"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              🔊 {soundEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalRef}
            className="px-5 py-4 h-[calc(100vh-52px)] overflow-y-auto text-xs sm:text-[15px] leading-relaxed sm:leading-7 tracking-wide relative z-10"
            style={{
              fontFamily:
                'var(--font-jetbrains-mono), "JetBrains Mono", "Fira Code", "Consolas", monospace',
            }}
          >
            {/* Snake Game */}
            {showSnake ? (
              <SnakeGame onExit={handleSnakeExit} />
            ) : (
              <>
                {output.map((line) =>
                  line.type === "banner" ? (
                    <pre
                      key={line.id}
                      className="text-emerald-400 font-bold mb-4 whitespace-pre overflow-x-auto leading-[1.1]"
                    >
                      {line.content}
                    </pre>
                  ) : (
                    <div
                      key={line.id}
                      className={`whitespace-pre-wrap break-words ${
                        line.type === "error"
                          ? "text-red-400"
                          : line.type === "success"
                            ? "text-green-400"
                            : "text-gray-100"
                      }`}
                    >
                      {line.content || "\u00A0"}
                    </div>
                  ),
                )}

                {/* Suggestions */}
                {suggestions.length > 1 && (
                  <div className="text-gray-500 mt-1">
                    {suggestions.join("  ")}
                  </div>
                )}

                {/* Input line - Linux style prompt */}
                <div className="flex items-center gap-0 mt-2">
                  <span className="text-[#50fa7b] font-semibold">riyaz</span>
                  <span className="text-gray-500">@</span>
                  <span className="text-[#50fa7b] font-semibold">
                    portfolio
                  </span>
                  <span className="text-white">:</span>
                  <span className="text-[#8be9fd]">
                    ~{currentPath.replace("/home/riyaz", "")}
                  </span>
                  <span className="text-white">$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none border-none focus:outline-none focus:ring-0 focus:border-none text-gray-100 caret-white"
                    style={{
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                      fontFamily:
                        'var(--font-jetbrains-mono), "JetBrains Mono", "Fira Code", "Consolas", monospace',
                      fontSize: "15px",
                      letterSpacing: "0.02em",
                    }}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                  <span className="w-2.5 h-5 bg-gray-100 terminal-cursor" />
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
