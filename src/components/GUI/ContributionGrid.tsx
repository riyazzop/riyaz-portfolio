"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionGridProps {
  contributions: ContributionDay[];
  title: string;
  icon: React.ReactNode;
  totalCount: number;
  totalActiveDays: number;
  maxStreak: number;
  color?: "green" | "orange";
  loading?: boolean;
  profileUrl?: string;
}

export default function ContributionGrid({
  contributions,
  title,
  icon,
  totalCount,
  totalActiveDays,
  maxStreak,
  color = "green",
  loading = false,
  profileUrl,
}: ContributionGridProps) {
  // Group contributions by week for grid display
  const { weeks, months } = useMemo(() => {
    if (!contributions.length) return { weeks: [], months: [] };

    // Create a map for quick lookup
    const contribMap = new Map(contributions.map((c) => [c.date, c.count]));

    // Generate all dates for last 8 months
    const today = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 12);

    // Align to start of week (Sunday)
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const weeks: { date: string; count: number }[][] = [];
    const months: { name: string; index: number }[] = [];
    let currentWeek: { date: string; count: number }[] = [];
    let lastMonth = -1;

    const currentDate = new Date(startDate);
    let weekIndex = 0;

    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const month = currentDate.getMonth();

      // Track month changes for labels
      if (month !== lastMonth) {
        months.push({
          name: currentDate.toLocaleString("default", { month: "short" }),
          index: weekIndex,
        });
        lastMonth = month;
      }

      currentWeek.push({
        date: dateStr,
        count: contribMap.get(dateStr) || 0,
      });

      // New week on Sunday
      if (currentDate.getDay() === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
        weekIndex++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Push remaining days
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return { weeks, months };
  }, [contributions]);

  const getIntensity = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const colorClasses = {
    green: [
      "bg-gray-800",
      "bg-green-900/60",
      "bg-green-700/70",
      "bg-green-500/80",
      "bg-green-400",
    ],
    orange: [
      "bg-gray-800",
      "bg-orange-900/60",
      "bg-orange-700/70",
      "bg-orange-500/80",
      "bg-orange-400",
    ],
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-800 animate-pulse" />
          <div className="h-6 w-48 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="h-32 bg-gray-800 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              color === "green" ? "bg-green-500/20" : "bg-orange-500/20"
            }`}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">
              {totalCount.toLocaleString()} contributions in the past year
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="text-white font-semibold">{totalActiveDays}</p>
            <p className="text-gray-500 text-xs">Active Days</p>
          </div>
          <div className="text-center">
            <p className="text-white font-semibold">{maxStreak}</p>
            <p className="text-gray-500 text-xs">Max Streak</p>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto pb-2">
        {/* Month Labels */}
        <div className="flex mb-2 text-xs text-gray-500 pl-0">
          {months.map((month, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                width: `${(weeks.length / months.length) * 14}px`,
                minWidth: "40px",
              }}
            >
              {month.name}
            </div>
          ))}
        </div>

        {/* Contribution Grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: weekIndex * 0.01 + dayIndex * 0.005 }}
                  className={`w-3 h-3 rounded-sm ${
                    colorClasses[color][getIntensity(day.count)]
                  } transition-colors hover:ring-1 hover:ring-white/30`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between gap-2 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>Less</span>
            {colorClasses[color].map((cls, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
            ))}
            <span>More</span>
          </div>
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                color === "green"
                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
              }`}
            >
              View Profile <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
