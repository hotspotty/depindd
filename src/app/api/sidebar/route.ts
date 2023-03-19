import { getMarkdownContent } from "@/app/(docs)/(utils)/markdown"
import { sidebarItems } from "@/app/(docs)/(utils)/sidebar"
import { NextResponse } from "next/server"
import path from "path"

export const ARTICLES_PATH = "src/app/(docs)/(articles)"

type EnhancedSidebarPage = { label: string; slug: string; path: string }

export type EnhancedSidebarSection = {
  section: string
  label: string
  items: EnhancedSidebarPage[]
}

export async function GET() {
  const enhancedSidebarSections: EnhancedSidebarSection[] = []

  for (var section of sidebarItems) {
    const enhancedSection: EnhancedSidebarSection = {
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

    enhancedSidebarSections.push(enhancedSection)
  }

  return NextResponse.json(enhancedSidebarSections)
}
