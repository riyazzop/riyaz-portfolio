"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "@/lib/data/blogs";

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-300"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {/* Render markdown content */}
          {post.content.split("\n").map((line, i) => {
            // Heading 1
            if (line.startsWith("# ")) {
              return (
                <h1 key={i} className="text-3xl font-bold mt-10 mb-4">
                  {line.replace("# ", "")}
                </h1>
              );
            }
            // Heading 2
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            // Heading 3
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-xl font-semibold mt-6 mb-3">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            // Code block start
            if (line.startsWith("```")) {
              return null; // Handle in a more complex way if needed
            }
            // List item
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="text-gray-300 ml-4">
                  {line.replace("- ", "")}
                </li>
              );
            }
            // Numbered list
            if (/^\d+\.\s/.test(line)) {
              return (
                <li key={i} className="text-gray-300 ml-4 list-decimal">
                  {line.replace(/^\d+\.\s/, "")}
                </li>
              );
            }
            // Bold text handling
            if (line.includes("**")) {
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i} className="text-gray-300 leading-relaxed mb-4">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-white font-semibold">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            }
            // Regular paragraph
            if (line.trim()) {
              return (
                <p key={i} className="text-gray-300 leading-relaxed mb-4">
                  {line}
                </p>
              );
            }
            // Empty line
            return <br key={i} />;
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-500 text-center">
            Thanks for reading! Feel free to{" "}
            <Link href="/#contact" className="text-white hover:underline">
              reach out
            </Link>{" "}
            if you have any questions.
          </p>
        </motion.footer>
      </article>
    </div>
  );
}
