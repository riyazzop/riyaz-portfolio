"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code, GraduationCap, Heart } from "lucide-react";
import { experiences } from "@/lib/data/experience";

const iconMap: Record<string, React.ReactNode> = {
  work: <Briefcase className="w-5 h-5" />,
  freelance: <Code className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  opensource: <Heart className="w-5 h-5" />,
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-4 bg-gray-950/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Journey & Experience
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            My professional journey and milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 md:-translate-x-1/2 border-4 border-black z-10" />

              {/* Content */}
              <div
                className={`flex-1 ml-8 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all"
                >
                  <div
                    className={`flex items-center gap-3 mb-3 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-white/5 text-white">
                      {iconMap[exp.type]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{exp.title}</h3>
                      <p className="text-sm text-gray-400">{exp.company}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {exp.date}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </p>
                  <ul
                    className={`space-y-2 ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-gray-400">
                        {item}
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
