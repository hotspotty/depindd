import { slugifyWithCounter } from "@sindresorhus/slugify"
import fs from "fs"
import matter from "gray-matter"
import getMarkdownContentFromText from "./getMarkdownContentFromText"

export function getMarkdownContent(filePath: string) {
  const source = fs.readFileSync(filePath, "utf-8")
  const matterResult = matter(source)
  const { title, topContentTag } = matterResult.data
  const content = getMarkdownContentFromText(source)
  const topContent = topContentTag
    ? getMarkdownContentFromText(`{% ${topContentTag} / %}`)
    : undefined
  return { content, title, topContent }
}

const getNodeText = (node) => {
  let text = ""

  for (let child of node.children ?? []) {
    if (typeof child === "string") {
      text += child
    }
    text += getNodeText(child)
  }

  return text
}

export const collectHeadings = (nodes: any, slugify = slugifyWithCounter()) => {
  let sections: any[] = []

  for (let node of nodes) {
    if (!node) continue

    if (node.name === "a") {
      node.attributes.target = "_blank"
    }

    if (node.name === "h2" || node.name === "h3") {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === "h3") {
          if (!sections[sections.length - 1]) {
            throw new Error(
              "Cannot add `h3` to table of contents without a preceding `h2`"
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}
