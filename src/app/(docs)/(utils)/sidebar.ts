import sidebarConfig from "@/app/(docs)/config.sidebar.json"
import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { projects } from "../(data)/projects"

type SidebarPage = { label: string; slug: string; path: string }

export type SidebarSection = {
  section: string
  label: string
  items: SidebarPage[]
}

export const CONTENT_PATH = "src/app/(docs)/(pages)"

export function getSidebarItems() {
  return sidebarConfig.reduce((acc: SidebarSection[], section) => {
    const enhancedSection: SidebarSection = {
      section: section.section,
      label: section.label,
      items: section.items.map((page) => {
        const projectInfo = projects.find((item) => item.slug === page)
        const filePath = path.join(CONTENT_PATH, section.section, page + ".md")
        const source = fs.readFileSync(filePath, "utf-8")
        const matterResult = matter(source)
        return {
          slug: page,
          path: `/${section.section}/${page}`,
          label: projectInfo?.title || matterResult.data.title,
        }
      }),
    }
    return acc.concat(enhancedSection)
  }, [])
}
