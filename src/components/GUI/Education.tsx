"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/lib/data/personal";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4 bg-gray-950/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Academic background and qualifications
          </p>
        </motion.div>

        {/* Education cards */}
        <div className="relative">
          {/* Animated Connector line - draws from top to bottom */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-gray-700 via-gray-600 to-gray-800 hidden md:block origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.2,
                  ease: "easeOut",
                }}
                className="relative flex gap-6"
              >
                {/* Icon with bounce animation */}
                <div className="hidden md:flex items-start">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      delay: 0.3 + index * 0.2,
                      type: "spring" as const,
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-16 h-16 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center text-3xl z-10"
                  >
                    {edu.icon}
                  </motion.div>
                </div>

                {/* Content card with enhanced hover */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.03)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-1 p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-500 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                    <div>
                      <span className="md:hidden text-2xl mr-2">
                        {edu.icon}
                      </span>
                      <h3 className="inline text-lg font-semibold">
                        {edu.degree}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-2">{edu.institution}</p>
                  <motion.p
                    className="text-sm text-green-400"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.2 }}
                  >
                    {edu.grade}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
