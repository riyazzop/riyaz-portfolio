"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data/personal";

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certifications
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </motion.div>

        {/* Certifications */}
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{cert.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Issued by {cert.issuer} • {cert.date}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <a
                    href={cert.link}
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    View Certificate <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
