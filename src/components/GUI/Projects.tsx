"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { projects } from "@/lib/data/projects";

// Lazy load 3D background for performance
const MinimalBackground = dynamic(
  () => import("@/components/Three/MinimalBackground"),
  { ssr: false },
);

const categories = ["All", "Frontend", "Backend", "Full-Stack", "ML"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    const categoryMap: Record<string, string> = {
      Frontend: "frontend",
      Backend: "backend",
      "Full-Stack": "fullstack",
      ML: "ml",
    };
    return project.category === categoryMap[activeCategory];
  });

  return (
    <section
      id="projects"
      className="py-24 px-4 relative overflow-hidden"
      ref={ref}
    >
      {/* Minimal 3D Background */}
      <MinimalBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Some of the projects I&apos;ve built
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => router.push(`/projects/${project.slug}`)}
              className="group relative rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 overflow-hidden transition-all cursor-pointer"
            >
              {/* Project image */}
              <div className="aspect-video bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-700 group-hover:scale-110 transition-transform">
                    {project.shortTitle}
                  </span>
                )}
                {/* Overlay removed as per request */}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {project.date}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-2 py-1 text-xs bg-gray-800 text-gray-500 rounded">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
