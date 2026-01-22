// GitHub Stats API
// Fetches real-time stats from GitHub API

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  contributions: number;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'riyazzop';

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    // Fetch user profile
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user');
    }

    const userData = await userResponse.json();

    // Fetch user repos to calculate stars and forks
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Calculate totals
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    return {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
      contributions: 500, // GitHub doesn't expose this easily, using estimate
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=10&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
