import { networks } from "@/app/(docs)/(content)/miner-networks/networkInfo"
import {
  collectHeadings,
  getMarkdownContentFromText,
} from "@/app/(docs)/(utils)/markdown"
import { capitalizeFirstLetter } from "@/app/(docs)/(utils)/text"
import { components } from "@/app/(docs)/config.markdoc"
import Markdoc from "@markdoc/markdoc"
import React from "react"
import { Prose } from "./Prose"

export default function Links({ network }: { network: string }) {
  const networkInfo = networks.find((item) => item.id === network)

  if (!networkInfo || networkInfo.scores.length === 0) {
    return <p>TBD</p>
  }

  let text = ""

  networkInfo.links.forEach(({ type, label, url }, index) => {
    if (index > 0) text += " • "
    let title = capitalizeFirstLetter(type)
    if (label) title += ` - ${label}`
    text += `[${title}](${url}) `
  })

  const content = getMarkdownContentFromText(text)

  collectHeadings(content) // This is a temporary hack because this function transforms the links to external links

  return (
    <Prose>
      {Markdoc.renderers.react(content, React, {
        components,
      })}
    </Prose>
  )
}
