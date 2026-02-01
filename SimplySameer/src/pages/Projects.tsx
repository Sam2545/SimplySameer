import { ProjectCard } from '../components/ProjectCard'
import { useGitHubProjects } from '../hooks/useGitHubProjects'

export function Projects() {
  const { data: projects, isLoading, isError, error } = useGitHubProjects()

  return (
    <div className="main-content">
      <div className="page-content">
        <h1>Projects</h1>
        {isLoading && (
          <p className="mt-4 text-gray-400">Loading projects…</p>
        )}
        {isError && (
          <p className="mt-4 text-red-400">
            {error instanceof Error ? error.message : 'Failed to load projects.'}
          </p>
        )}
        {projects && projects.length > 0 && (
          <div className="mt-4 flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        {projects && projects.length === 0 && !isLoading && (
          <p className="mt-4 text-gray-400">No projects to show.</p>
        )}
      </div>
    </div>
  )
}
