import { getMarkdownContent } from "@/app/(docs)/(utils)/markdown"
import sidebarConfig from "@/app/(docs)/config.sidebar.json"
import { ARTICLES_PATH } from "@/app/(docs)/[section]/[slug]/page"
import { NextResponse } from "next/server"
import path from "path"

type EnhancedSidebarPage = { label: string; slug: string; path: string }

export type SidebarSection = {
  section: string
  label: string
  items: EnhancedSidebarPage[]
}

export async function GET() {
  const sidebarSections: SidebarSection[] = []

  for (var section of sidebarConfig) {
    const enhancedSection: SidebarSection = {
      section: section.section,
      label: section.label,
      items: [],
    }

    for (var page of section.items) {
      const filePath = path.join(ARTICLES_PATH, section.section, page + ".md")

      const { title } = await getMarkdownContent(filePath)

      enhancedSection.items.push({
        slug: page,
        path: `/${section.section}/${page}`,
        label: title || "Untitled",
      })
    }

    sidebarSections.push(enhancedSection)
  }

  return NextResponse.json(sidebarSections)
}
