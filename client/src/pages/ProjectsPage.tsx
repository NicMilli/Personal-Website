import { useState } from "react";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import type { CategoryDoc, UrlDoc, Project } from "@/types/firebase";
import ProjectCard from "@/components/ProjectCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: categoryDoc, loading: catLoading } =
    useFirestoreDoc<CategoryDoc>("Portfolio", "Category");
  const { data: urlDoc, loading: urlLoading } = useFirestoreDoc<UrlDoc>(
    "Portfolio",
    "url",
  );

  if (catLoading || urlLoading) return <LoadingSpinner />;

  const categories = ["All", ...(categoryDoc?.categories ?? [])];
  const projects: Project[] = (urlDoc?.urls ?? []).map((u, i) => ({
    id: String(i),
    ...u,
  }));

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">Projects</h1>

      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
