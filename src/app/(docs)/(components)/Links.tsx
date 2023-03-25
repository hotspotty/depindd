import { components } from "@/app/(docs)/config.markdoc"
import Markdoc from "@markdoc/markdoc"
import React from "react"
import getMarkdownContentFromText from "../(utils)/getMarkdownContentFromText"
import makeMarkdownLinksExternal from "../(utils)/makeMarkdownLinksExternal"
import { Prose } from "./markdoc/Prose"

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
  className,
}: {
  linksMarkdownText: string
  className?: string
}) {
  const content = getMarkdownContentFromText(linksMarkdownText)

  makeMarkdownLinksExternal(content)

  return (
    <Prose className={className}>
      {Markdoc.renderers.react(content, React, {
        components,
      })}
    </Prose>
  )
}

export default function Links({
  links,
  className,
}: {
  links: { title: string; url: string }[]
  className?: string
}) {
  if (links.length === 0) return null

  return (
    <RenderLinks
      className={className}
      linksMarkdownText={getLinksMarkdowntext(links)}
    />
  )
}
