import { Octokit } from 'octokit'
import type { GitHubRepository, GitHubProject } from '../types/github'
import { token, username } from '../config/env'

function getOctokit() {
  return new Octokit(
    token
      ? { auth: token }
      : { auth: undefined }
  )
}

function mapRepoToProject(repo: GitHubRepository): GitHubProject {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description ?? null,
    language: repo.language ?? null,
    stargazersCount: repo.stargazers_count,
    repoUrl: repo.html_url,
    demoUrl: repo.homepage && repo.homepage.trim() !== '' ? repo.homepage : null,
    updatedAt: repo.updated_at,
  }
}

/**
 * Fetches public repositories for the configured GitHub user.
 * Token is optional (higher rate limits when provided).
 * Never log or expose the token.
 */
export async function fetchGitHubRepositories(): Promise<GitHubProject[]> {
  const user = username?.trim()
  if (!user) {
    throw new Error('VITE_GITHUB_USERNAME is not set')
  }

  const octokit = getOctokit()

  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: user,
      sort: 'updated',
      type: 'owner',
    })

    const repos = data as unknown as GitHubRepository[]
    const filtered = repos.filter((repo) => !repo.fork)
    return filtered.map(mapRepoToProject)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const status =
      err && typeof err === 'object' && 'status' in err
        ? (err as { status: number }).status
        : null
    if (status === 404) {
      throw new Error(
        `GitHub user "${user}" not found. Check that VITE_GITHUB_USERNAME matches your GitHub username (e.g. https://github.com/${user})`
      )
    }
    throw new Error(`GitHub API error: ${message}`)
  }
}
