import { config } from "@/app/(docs)/config.markdoc"
import Markdoc from "@markdoc/markdoc"
import { slugifyWithCounter } from "@sindresorhus/slugify"
import fs from "fs"
import matter from "gray-matter"
import path from "path"

export async function getMarkdownContent(
  baseFilePath: string,
  slug: string | undefined
) {
  const filePath = path.join(baseFilePath, slug + ".md")
  const source = fs.readFileSync(filePath, "utf-8")
  const matterResult = matter(source)
  const { title, type } = matterResult.data
  const ast = Markdoc.parse(source)
  const content = Markdoc.transform(ast, config)
  return { content, title }
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
