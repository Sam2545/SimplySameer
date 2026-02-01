/**
 * GitHub API response types (subset we use)
 */

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
}

export interface GitHubProject {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazersCount: number
  repoUrl: string
  demoUrl: string | null
  updatedAt: string
}
