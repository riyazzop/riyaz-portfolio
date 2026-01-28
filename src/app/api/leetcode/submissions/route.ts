import { NextResponse } from "next/server";

// Revalidate every 24 hours
export const revalidate = 86400;

interface LeetCodeResponse {
  data: {
    matchedUser: {
      submissionCalendar: string;
      submitStats: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
        }[];
      };
    };
  };
}

export async function GET() {
  const username = process.env.NEXT_PUBLIC_LEETCODE_USERNAME;

  if (!username) {
    return NextResponse.json(
      { error: "LeetCode username not configured" },
      { status: 500 },
    );
  }

  const query = `
    query userProfileCalendar($username: String!) {
      matchedUser(username: $username) {
        submissionCalendar
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`);
    }

    const data: LeetCodeResponse = await response.json();

    if (!data.data?.matchedUser) {
      throw new Error("User not found");
    }

    // Parse submission calendar (comes as JSON string with timestamps)
    const calendarData = JSON.parse(
      data.data.matchedUser.submissionCalendar || "{}",
    );

    // Convert to our format and filter to last 8 months
    const eightMonthsAgo = new Date();
    eightMonthsAgo.setMonth(eightMonthsAgo.getMonth() - 12);
    const cutoffTimestamp = Math.floor(eightMonthsAgo.getTime() / 1000);

    const contributions: { date: string; count: number }[] = [];
    let totalSubmissions = 0;
    let totalActiveDays = 0;
    let maxStreak = 0;
    let currentStreak = 0;

    // Sort timestamps
    const timestamps = Object.keys(calendarData)
      .map(Number)
      .filter((ts) => ts >= cutoffTimestamp)
      .sort((a, b) => a - b);

    let tempStreak = 0;
    let prevDate: Date | null = null;

    timestamps.forEach((timestamp) => {
      const date = new Date(timestamp * 1000);
      const dateStr = date.toISOString().split("T")[0];
      const count = calendarData[timestamp.toString()];

      contributions.push({ date: dateStr, count });
      totalSubmissions += count;

      if (count > 0) {
        totalActiveDays++;

        // Check if consecutive day
        if (prevDate) {
          const dayDiff = Math.floor(
            (date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (dayDiff === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
        } else {
          tempStreak = 1;
        }

        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
        prevDate = date;
      }
    });

    // Calculate current streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sortedContributions = [...contributions].reverse();

    for (const contrib of sortedContributions) {
      const contribDate = new Date(contrib.date);
      contribDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor(
        (today.getTime() - contribDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysDiff <= currentStreak + 1 && contrib.count > 0) {
        currentStreak++;
      } else if (daysDiff > currentStreak + 1) {
        break;
      }
    }

    // Get problem stats
    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const problemsSolved = stats.reduce((acc, s) => acc + s.count, 0);

    return NextResponse.json({
      totalSubmissions,
      totalActiveDays,
      currentStreak,
      maxStreak,
      problemsSolved,
      contributions,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 },
    );
  }
}
