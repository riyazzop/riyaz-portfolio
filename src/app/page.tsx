"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModeStore } from "@/lib/store";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ModeSelector from "@/components/shared/ModeSelector";
import Terminal from "@/components/CLI/Terminal";
import GUILayout from "@/components/GUI/GUILayout";

export default function Home() {
  const {
    mode,
    isLoading,
    showModeSelector,
    setIsLoading,
    setShowModeSelector,
  } = useModeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!mode) {
        setShowModeSelector(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [mode, setIsLoading, setShowModeSelector]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {!isLoading && showModeSelector && (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ModeSelector />
          </motion.div>
        )}

        {!isLoading && !showModeSelector && mode === "cli" && (
          <motion.div
            key="cli"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Terminal />
          </motion.div>
        )}

        {!isLoading && !showModeSelector && mode === "gui" && (
          <motion.div
            key="gui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GUILayout />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
