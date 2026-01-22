"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart, Github, Code } from "lucide-react";
import { personalInfo } from "@/lib/data/personal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {personalInfo.name}
            </p>
            <p className="text-sm text-gray-600 flex items-center justify-center md:justify-start gap-1">
              Built with Next.js, Three.js &{" "}
              <Heart className="w-4 h-4 text-red-500" />
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-white transition-colors"
            >
              <Code className="w-5 h-5" />
            </a>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 hover:border-gray-600 text-sm text-gray-400 hover:text-white transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </motion.button>
        </div>

        {/* Visitor counter (placeholder) */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-700 font-mono">
            Visitor #{Math.floor(Math.random() * 10000) + 1234}
          </p>
        </div>
      </div>
    </footer>
  );
}
