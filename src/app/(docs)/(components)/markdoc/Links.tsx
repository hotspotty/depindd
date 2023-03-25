import { projects } from "@/app/(docs)/(data)/projects"
import { capitalizeFirstLetter } from "@/app/(docs)/(utils)/text"
import { components } from "@/app/(docs)/config.markdoc"
import Markdoc from "@markdoc/markdoc"
import React from "react"
import getMarkdownContentFromText from "../../(utils)/getMarkdownContentFromText"
import makeMarkdownLinksExternal from "../../(utils)/makeMarkdownLinksExternal"
import { Prose } from "./Prose"

export function getLinksMarkdowntext(links: { title: string; url: string }[]) {
  let text = ""

  links.forEach(({ title, url }, index) => {
    if (index > 0) text += " • "
    text += `[${title}](${url}) `
  })

  return text
}

export function RenderLinks({
  linksMarkdownText,
}: {
  linksMarkdownText: string
}) {
  const content = getMarkdownContentFromText(linksMarkdownText)

  makeMarkdownLinksExternal(content)

  return (
    <Prose>
      {Markdoc.renderers.react(content, React, {
        components,
      })}
    </Prose>
  )
}

export default function Links({ project }: { project: string }) {
  const projectInfo = projects.find((item) => item.id === project)

  if (!projectInfo || projectInfo.links.length === 0) {
    return <p>TBD</p>
  }

  const links = projectInfo.links.map(({ type, label, url }) => {
    let title = capitalizeFirstLetter(type)
    if (label) title += ` - ${label}`
    return { title, url }
  })

  return <RenderLinks linksMarkdownText={getLinksMarkdowntext(links)} />
}
