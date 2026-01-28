"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Layout, Server, Layers, Zap, Brain, Cloud } from "lucide-react";
import { journeyMilestones } from "@/lib/data/experience";

const iconMap: Record<string, React.ReactNode> = {
  "journey-1": <Code className="w-5 h-5" />,
  "journey-2": <Layout className="w-5 h-5" />,
  "journey-3": <Server className="w-5 h-5" />,
  "journey-4": <Layers className="w-5 h-5" />,
  "journey-5": <Zap className="w-5 h-5" />,
  "journey-6": <Brain className="w-5 h-5" />,
  "journey-7": <Cloud className="w-5 h-5" />,
};

const colorMap: Record<string, string> = {
  "journey-1": "bg-blue-500/20 text-blue-400",
  "journey-2": "bg-purple-500/20 text-purple-400",
  "journey-3": "bg-green-500/20 text-green-400",
  "journey-4": "bg-orange-500/20 text-orange-400",
  "journey-5": "bg-red-500/20 text-red-400",
  "journey-6": "bg-yellow-500/20 text-yellow-400",
  "journey-7": "bg-cyan-500/20 text-cyan-400",
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-4 bg-gray-950/50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Journey</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From learning the basics to building production-grade systems
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform md:-translate-x-1/2" />

          {journeyMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center ${colorMap[milestone.id]}`}
              >
                {iconMap[milestone.id]}
              </div>

              {/* Content */}
              <div
                className={`flex-1 ml-16 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all shadow-lg"
                >
                  {/* Period badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 ${colorMap[milestone.id]}`}
                  >
                    {milestone.period}
                  </div>

                  {/* Title and focus */}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {milestone.focus}
                  </p>

                  {/* Details */}
                  <ul
                    className={`space-y-2 ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    {milestone.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-400 flex items-start gap-2"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                            colorMap[milestone.id].split(" ")[0]
                          }`}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Spacer for alternating */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
