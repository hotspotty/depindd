import { Category, projects } from "@/app/(docs)/(data)/projects"
import { QuickLink, QuickLinks } from "./QuickLinks"

export default function LegoCategoryProjects({
  lego,
  category,
}: {
  lego: string
  category: Category
}) {
  const filteredProjects = projects.filter(
    (project) => project.lego === lego && project.categories.includes(category)
  )

  if (filteredProjects.length === 0) {
    return null
  }

  return (
    <>
      <h4>Projects</h4>
      <QuickLinks className="lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <QuickLink
            key={project.slug}
            title={project.title}
            image={project.logo}
            href={`/projects/${project.slug}`}
          />
        ))}
      </QuickLinks>
    </>
  )
}
