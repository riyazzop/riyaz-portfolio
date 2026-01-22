"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MatrixRainProps {
  onExit: () => void;
}

export default function MatrixRain({ onExit }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showExitHint, setShowExitHint] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops at random positions
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Brighter head of the column
        if (drops[i] > 0) {
          ctx.fillStyle = "#fff";
          ctx.fillText(char, x, y);
          ctx.fillStyle = "#0f0";
        }

        ctx.fillText(char, x, y - fontSize);

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Handle key press to exit
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "q") {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    // Hide exit hint after 3 seconds
    const hintTimeout = setTimeout(() => setShowExitHint(false), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(hintTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onExit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
      onClick={onExit}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {showExitHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-green-500 font-mono text-sm"
        >
          Press ESC or Q to exit • Click anywhere
        </motion.div>
      )}
    </motion.div>
  );
}
