import { projects } from "@/app/(docs)/(data)/projects"
import { QuickLink, QuickLinks } from "./QuickLinks"

export default function BlockchainProjects({
  blockchain,
}: {
  blockchain: string
}) {
  const filteredProjects = projects.filter((project) =>
    project.blockchains.includes(blockchain)
  )

  if (filteredProjects.length === 0) {
    return null
  }

  return (
    <>
      <h4>DePIN projects</h4>
      <QuickLinks className="lg:grid-cols-2">
        {filteredProjects.map(
          ({ slug, title, category, subcategories, logo }) => (
            <QuickLink
              key={slug}
              title={title}
              labels={[category, ...subcategories]}
              image={logo}
              href={`/projects/${slug}`}
            />
          )
        )}
      </QuickLinks>
    </>
  )
}
