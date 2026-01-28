"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Code2 } from "lucide-react";
import ContributionGrid from "./ContributionGrid";

interface ContributionData {
  totalContributions?: number;
  totalSubmissions?: number;
  totalActiveDays: number;
  currentStreak: number;
  maxStreak: number;
  problemsSolved?: number;
  contributions: { date: string; count: number }[];
}

export default function ActivityStats() {
  const [githubData, setGithubData] = useState<ContributionData | null>(null);
  const [leetcodeData, setLeetcodeData] = useState<ContributionData | null>(
    null,
  );
  const [githubLoading, setGithubLoading] = useState(true);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [leetcodeError, setLeetcodeError] = useState<string | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // Fetch GitHub data
    fetch("/api/github/contributions")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setGithubError(data.error);
        } else {
          setGithubData(data);
        }
      })
      .catch(() => setGithubError("Failed to fetch GitHub data"))
      .finally(() => setGithubLoading(false));

    // Fetch LeetCode data
    fetch("/api/leetcode/submissions")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLeetcodeError(data.error);
        } else {
          setLeetcodeData(data);
        }
      })
      .catch(() => setLeetcodeError("Failed to fetch LeetCode data"))
      .finally(() => setLeetcodeLoading(false));
  }, []);

  return (
    <section
      id="activity"
      ref={ref}
      className="py-24 px-4 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Coding Activity
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            My contributions and problem-solving journey over the past year
          </p>
        </motion.div>

        {/* Grids Container */}
        <div className="space-y-8">
          {/* GitHub Grid */}
          {githubError ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
              <p className="text-red-400">{githubError}</p>
            </div>
          ) : (
            <ContributionGrid
              contributions={githubData?.contributions || []}
              title="GitHub Contributions"
              icon={<Github className="w-5 h-5 text-green-400" />}
              totalCount={githubData?.totalContributions || 0}
              totalActiveDays={githubData?.totalActiveDays || 0}
              maxStreak={githubData?.maxStreak || 0}
              color="green"
              loading={githubLoading}
              profileUrl="https://github.com/riyazzop"
            />
          )}

          {/* LeetCode Grid */}
          {leetcodeError ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
              <p className="text-orange-400">{leetcodeError}</p>
            </div>
          ) : (
            <ContributionGrid
              contributions={leetcodeData?.contributions || []}
              title="LeetCode Submissions"
              icon={<Code2 className="w-5 h-5 text-orange-400" />}
              totalCount={leetcodeData?.totalSubmissions || 0}
              totalActiveDays={leetcodeData?.totalActiveDays || 0}
              maxStreak={leetcodeData?.maxStreak || 0}
              color="orange"
              loading={leetcodeLoading}
              profileUrl="https://leetcode.com/u/riyaz_op"
            />
          )}
        </div>
      </div>
    </section>
  );
}
