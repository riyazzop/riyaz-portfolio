"use client";

import { motion } from "framer-motion";
import { Terminal, Monitor } from "lucide-react";
import { useModeStore } from "@/lib/store";

export default function ModeSelector() {
  const setMode = useModeStore((state) => state.setMode);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        {/* Modal */}
        <div className="glass rounded-2xl p-8 text-center">
          {/* Logo/Name */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              SHAIK RIYAZ BASHA
            </h1>
            <p className="text-gray-400 mb-8">
              Full-Stack Developer • AI Enthusiast
            </p>
          </motion.div>

          {/* Question */}
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 text-gray-300"
          >
            Choose your experience:
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(34, 197, 94, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode("cli")}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 border border-gray-700 rounded-xl hover:border-green-500 transition-colors group"
            >
              <Terminal className="w-6 h-6 text-green-500 group-hover:animate-pulse" />
              <div className="text-left">
                <div className="font-semibold text-white">CLI Mode</div>
                <div className="text-xs text-gray-500">Terminal experience</div>
              </div>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode("gui")}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 border border-gray-700 rounded-xl hover:border-white transition-colors group"
            >
              <Monitor className="w-6 h-6 text-white group-hover:animate-pulse" />
              <div className="text-left">
                <div className="font-semibold text-white">GUI Mode</div>
                <div className="text-xs text-gray-500">Visual experience</div>
              </div>
            </motion.button>
          </div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-gray-600 mt-8"
          >
            You can switch modes anytime
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
