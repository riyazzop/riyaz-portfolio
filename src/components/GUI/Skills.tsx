"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layout, Server, Database, Brain, Wrench } from "lucide-react";
import { skillCategories } from "@/lib/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-4 bg-gray-950/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header with slide-in animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills grid with staggered cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: catIndex * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.05)",
              }}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-500 transition-all duration-300"
            >
              {/* Category header with icon scale on hover */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-2 rounded-lg bg-white/5 text-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {iconMap[category.icon]}
                </motion.div>
                <motion.h3
                  className="text-lg font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: catIndex * 0.15 + 0.2, duration: 0.5 }}
                >
                  {category.name}
                </motion.h3>
              </div>

              {/* Skills with smooth progress bars */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-linear-to-r from-gray-400 to-white rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1.2,
                          delay: catIndex * 0.15 + skillIndex * 0.08 + 0.4,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
