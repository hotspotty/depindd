import sidebarConfig from "@/app/(docs)/config.sidebar.json"
import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { blockchainInfo } from "../(data)/blockchains"
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
  return sidebarConfig.reduce((acc: SidebarSection[], section) => {
    const enhancedSection: SidebarSection = {
      section: section.section,
      label: section.label,
      // TODO: add it automatically for blockchains and projects
      items: section.items.map((page) => {
        let title = capitalizeFirstLetter(page)

        if (section.section === "projects") {
          const projectInfo = projects.find((item) => item.slug === page)
          if (projectInfo) title = projectInfo.title
        } else if (section.section === "blockchains") {
          const blockchain = blockchainInfo[page]
          if (blockchain) title = blockchain.title
        } else {
          const filePath = path.join(PAGES_PATH, section.section, page + ".md")
          const source = fs.readFileSync(filePath, "utf-8")
          const { data } = matter(source)
          if (data.title) title = data.title
        }

        return {
          slug: page,
          path: `/${section.section}/${page}`,
          label: title,
        }
      }),
    }
    return acc.concat(enhancedSection)
  }, [])
}
