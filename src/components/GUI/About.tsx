"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Phone, Sparkles } from "lucide-react";
import { personalInfo, funFacts } from "@/lib/data/personal";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-24 px-4 relative overflow-hidden"
      ref={ref}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Get to know me better
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Gradient border wrapper */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-linear-to-br from-white via-gray-500 to-gray-800 shadow-2xl shadow-white/10">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 relative">
                  <Image
                    src="/profile/profile.webp"
                    alt={personalInfo.name}
                    fill
                    className="object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
              {/* Status indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-300">Available</span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">{personalInfo.name} Basha</h3>
            <p className="text-gray-400 leading-relaxed">
              {personalInfo.summary}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>{personalInfo.phone}</span>
              </div>
            </div>

            {/* Currently learning */}
            <div className="flex items-center gap-2 text-gray-300">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>
                Currently learning:{" "}
                <span className="text-white">
                  {personalInfo.currentlyLearning}
                </span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Fun facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Fun Facts</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {funFacts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-center"
              >
                <p className="text-gray-400 text-sm">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
