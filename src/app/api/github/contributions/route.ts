import { NextResponse } from "next/server";

// Revalidate every 24 hours
export const revalidate = 86400;

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
}

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!username || !token) {
    return NextResponse.json(
      { error: "GitHub credentials not configured" },
      { status: 500 },
    );
  }

  // Calculate date range (last 8 months)
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 12);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubResponse = await response.json();

    if (!data.data?.user) {
      throw new Error("User not found");
    }

    const calendar =
      data.data.user.contributionsCollection.contributionCalendar;

    // Flatten weeks into daily contributions
    const contributions: { date: string; count: number }[] = [];
    let totalActiveDays = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    calendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
        });

        if (day.contributionCount > 0) {
          totalActiveDays++;
          tempStreak++;
          if (tempStreak > maxStreak) {
            maxStreak = tempStreak;
          }
        } else {
          tempStreak = 0;
        }
      });
    });

    // Calculate current streak (from today backwards)
    const sortedContributions = [...contributions].reverse();
    for (const contrib of sortedContributions) {
      if (contrib.count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      totalActiveDays,
      currentStreak,
      maxStreak,
      contributions,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 },
    );
  }
}
