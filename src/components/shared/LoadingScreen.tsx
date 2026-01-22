"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bootSequence = [
  "[    0.000000] Initializing portfolio system...",
  "[    0.142857] Loading personality matrix... OK",
  "[    0.285714] Mounting /dev/skills... OK",
  "[    0.428571] Starting project daemon... OK",
  "[    0.571429] Initializing creative engine... OK",
  "[    0.714286] Loading experience modules... OK",
  "[    0.857143] Configuring neural networks... OK",
  "[    1.000000] System ready.",
  "",
  "Welcome to RiyazOS v1.0",
  "",
];

export default function LoadingScreen() {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl font-mono text-sm text-green-500"
      >
        {/* Terminal window */}
        <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
          {/* Title bar - Linux style (no Mac dots) */}
          <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-center border-b border-gray-800">
            <span className="text-gray-400 text-sm font-medium">
              riyaz@portfolio: ~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-4 min-h-[300px]">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className="leading-relaxed"
              >
                {line || "\u00A0"}
              </motion.div>
            ))}
            {lines.length < bootSequence.length && (
              <span
                className={`inline-block w-2 h-4 bg-green-500 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </div>

        {/* Loading bar */}
        <div className="mt-6">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.3, ease: "linear" }}
            />
          </div>
          <p className="text-center text-gray-500 text-xs mt-2">
            Initializing experience...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
