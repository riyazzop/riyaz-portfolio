"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Play } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import VideoPlayer from "@/components/GUI/VideoPlayer";
import DemoModal from "@/components/GUI/DemoModal";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-gray-400 mb-4">{project.date}</p>
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-white transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </button>
          </div>
        </motion.div>

        {/* Project image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 border p-[2px] rounded-2xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 aspect-video flex items-center justify-center relative"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl font-bold text-gray-700">
              {project.shortTitle}
            </span>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert max-w-none mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">About This Project</h2>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </motion.div>

        {/* Key highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Key Highlights</h2>
          <ul className="space-y-4">
            {project.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <span className="text-gray-300">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Demo Video Player */}
        {project.demoVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Demo Video</h2>
            <VideoPlayer
              src={project.demoVideo}
              poster={project.image}
              title={project.title}
            />
          </motion.div>
        )}

        {/* No video placeholder */}
        {!project.demoVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl bg-gray-900/50 border border-gray-800 p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Demo Video</h3>
            <p className="text-gray-500">Coming soon...</p>
          </motion.div>
        )}
      </div>

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onProceed={() => {
          setIsDemoModalOpen(false);
          if (project.demo) {
            window.open(project.demo, "_blank", "noopener,noreferrer");
          }
        }}
        projectTitle={project.title}
        demoUrl={project.demo}
        hasDemoVideo={!!project.demoVideo}
        isAwsHosted={project.isAwsHosted}
      />
    </div>
  );
}
