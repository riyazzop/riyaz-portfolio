"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/data/blogs";

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Thoughts & Writings
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Articles about development and technology
          </p>
        </motion.div>

        {/* Blog grid with staggered cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <Link href={`/blog/${post.slug}`}>
                <motion.article
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.03)",
                  }}
                  className="group h-full p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-500 transition-all duration-300"
                >
                  {/* Thumbnail with zoom effect */}
                  <motion.div
                    className="h-40 mb-6 rounded-xl bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Pulsing document icon */}
                    <motion.span
                      className="text-4xl"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      📝
                    </motion.span>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    {/* Arrow with slide animation */}
                    <motion.span
                      className="flex items-center gap-1 text-gray-400 group-hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Read{" "}
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
