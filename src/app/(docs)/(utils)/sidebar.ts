import sidebarConfig from "@/app/(docs)/config.sidebar.json"
import fs from "fs"
import { glob } from "glob"
import matter from "gray-matter"
import path from "path"
import { blockchains } from "../(data)/blockchains"
import { projects } from "../(data)/projects"
import { capitalizeFirstLetter } from "./text"

type SidebarPage = {
  label: string
  slug: string
  path: string
}

export type SidebarSection = {
  section: string
  label: string
  items: SidebarPage[]
  showCount: boolean
}

export const PAGES_PATH = "src/app/(docs)/(pages)"

export async function getSidebarItems() {
  const sidebarSections: SidebarSection[] = []

  for await (const sidebarSection of sidebarConfig) {
    let {
      section,
      label,
      automated,
      showCount = false,
      slugs = [],
    } = sidebarSection

    if (automated) {
      const markdownPagePaths = await glob(
        path.join(process.cwd(), PAGES_PATH, section, "**/*.md")
      )
      const pageSlugs = markdownPagePaths.map((pagePath) =>
        path.basename(pagePath, path.extname(pagePath))
      )
      slugs = pageSlugs.sort()
    }

    const enhancedSection: SidebarSection = {
      section,
      label,
      showCount,
      items: slugs.map((slug) => {
        let title = capitalizeFirstLetter(slug)

        if (section === "projects") {
          const projectInfo = projects.find((project) => project.slug === slug)
          if (projectInfo) title = projectInfo.title
        } else if (section === "blockchains") {
          const blockchainInfo = blockchains.find(
            (blockchain) => blockchain.slug === slug
          )
          if (blockchainInfo) title = blockchainInfo.title
        } else {
          const filePath = path.join(PAGES_PATH, section, slug + ".md")
          const source = fs.readFileSync(filePath, "utf-8")
          const { data } = matter(source)
          if (data.title) title = data.title
        }

        return {
          slug,
          path: `/${section}/${slug}`,
          label: title,
        }
      }),
    }

    sidebarSections.push(enhancedSection)
  }

  return sidebarSections
}
