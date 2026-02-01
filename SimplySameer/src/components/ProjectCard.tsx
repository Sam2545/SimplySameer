import type { GitHubProject } from '../types/github'

interface ProjectCardProps {
  project: GitHubProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-left">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        {project.language && (
          <span className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
            {project.language}
          </span>
        )}
      </div>
      {project.description && (
        <p className="mb-3 text-sm text-gray-400">{project.description}</p>
      )}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-500">★ {project.stargazersCount}</span>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline"
        >
          View on GitHub
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline"
          >
            Live demo
          </a>
        )}
      </div>
    </article>
  )
}
