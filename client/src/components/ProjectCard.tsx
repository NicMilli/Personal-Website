import type { Project } from "@/types/firebase";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-5">
        <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {project.category}
        </span>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-gray-600">{project.description}</p>
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-800"
            >
              Live Demo
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
