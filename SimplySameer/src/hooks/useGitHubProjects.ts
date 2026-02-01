import { useQuery } from '@tanstack/react-query'
import { fetchGitHubRepositories } from '../services/github'

const QUERY_KEY = ['github', 'repositories'] as const

export function useGitHubProjects() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchGitHubRepositories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
