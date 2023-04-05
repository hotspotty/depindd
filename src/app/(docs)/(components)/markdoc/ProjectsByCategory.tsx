import { projects } from "@/app/(docs)/(data)/projects"
import { Subcategory } from "@/app/(docs)/(data)/types"
import { QuickLink, QuickLinks } from "./QuickLinks"

export default function ProjectsByCategory({
  category,
  subcategory,
}: {
  category: string
  subcategory: Subcategory
}) {
  const filteredProjects = projects.filter(
    (project) =>
      project.category === category &&
      project.subcategories.includes(subcategory)
  )

  if (filteredProjects.length === 0) {
    return null
  }

  return (
    <>
      <h4>Projects</h4>
      <QuickLinks>
        {filteredProjects.map(({ slug, title, logo, token }) => (
          <QuickLink
            key={slug}
            title={title}
            image={logo}
            description={token ? `$${token}` : undefined}
            href={`/projects/${slug}`}
          />
        ))}
      </QuickLinks>
    </>
  )
}
