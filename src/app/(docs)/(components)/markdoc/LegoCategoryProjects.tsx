import { projects } from "@/app/(docs)/(data)/projects"
import { Category } from "@/app/(docs)/(data)/types"
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
      <QuickLinks>
        {filteredProjects.map(({ slug, title, logo, blockchain }) => (
          <QuickLink
            key={slug}
            title={title}
            image={logo}
            labels={[blockchain]}
            href={`/projects/${slug}`}
          />
        ))}
      </QuickLinks>
    </>
  )
}
