import sidebarConfig from "@/app/(docs)/config.sidebar.json"
import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { blockchains } from "../(data)/blockchains"
import { projects } from "../(data)/projects"
import { capitalizeFirstLetter } from "./text"

type SidebarPage = { label: string; slug: string; path: string }

export type SidebarSection = {
  section: string
  label: string
  items: SidebarPage[]
}

export const PAGES_PATH = "src/app/(docs)/(pages)"

export function getSidebarItems() {
  return sidebarConfig.reduce(
    (acc: SidebarSection[], { section, label, items }) => {
      const enhancedSection: SidebarSection = {
        section,
        label,
        // TODO: add it automatically for blockchains and projects
        items: items.map((slug) => {
          let title = capitalizeFirstLetter(slug)

          if (section === "projects") {
            const projectInfo = projects.find(
              (project) => project.slug === slug
            )
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
      return acc.concat(enhancedSection)
    },
    []
  )
}
