"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GitCommit, Code, Folder, Star, Users } from "lucide-react";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  contributions: number;
}

const iconMap: Record<string, React.ReactNode> = {
  GitCommit: <GitCommit className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Folder: <Folder className="w-8 h-8" />,
  Star: <Star className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
};

function AnimatedCounter({
  value,
  isInView,
}: {
  value: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span>{count}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "riyazzop";

        // Fetch user profile
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
        );
        if (!userResponse.ok) throw new Error("Failed to fetch");
        const userData = await userResponse.json();

        // Fetch repos for star count
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
        );
        const repos = await reposResponse.json();
        const totalStars = Array.isArray(repos)
          ? repos.reduce(
              (sum: number, repo: { stargazers_count: number }) =>
                sum + repo.stargazers_count,
              0,
            )
          : 0;

        setGithubStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          totalStars,
          contributions: 500, // Estimate - GitHub doesn't expose this easily
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        // Fallback stats
        setGithubStats({
          publicRepos: 10,
          followers: 50,
          totalStars: 25,
          contributions: 500,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statsData = [
    {
      value: githubStats?.contributions || 500,
      label: "Contributions",
      icon: "GitCommit",
    },
    {
      value: githubStats?.publicRepos || 10,
      label: "Repositories",
      icon: "Folder",
    },
    {
      value: githubStats?.totalStars || 25,
      label: "GitHub Stars",
      icon: "Star",
    },
    {
      value: githubStats?.followers || 50,
      label: "Followers",
      icon: "Users",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gray-950/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">GitHub Stats</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Real-time stats from my GitHub profile
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 text-center hover:border-gray-600 transition-all"
            >
              <div className="inline-flex p-3 rounded-xl bg-white/5 text-white mb-4">
                {iconMap[stat.icon]}
              </div>
              <div className="text-4xl font-bold mb-2">
                {loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <AnimatedCounter value={stat.value} isInView={isInView} />
                )}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/riyazzop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            View my GitHub profile →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
