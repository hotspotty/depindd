import { networks } from "@/app/(docs)/(content)/(data)/networks"
import { components } from "@/app/(docs)/config.markdoc"
import Markdoc from "@markdoc/markdoc"
import React, { Fragment } from "react"
import getMarkdownContentFromText from "../../(utils)/getMarkdownContentFromText"
import { Prose } from "./Prose"

const scoreTypeTitles = {
  governance: "Governance",
  tokenomics: "Tokenomics",
  "ease-of-mining": "Ease of mining",
}

export default function Scores({ network }: { network: string }) {
  const networkInfo = networks.find((item) => item.id === network)

  if (!networkInfo || networkInfo.scores.length === 0) {
    return <p>TBD</p>
  }

  return networkInfo.scores.map(({ type, value, description }) => (
    <Fragment key={type}>
      <h3>
        {scoreTypeTitles[type]} score: {value}/10
      </h3>
      <Prose>
        {Markdoc.renderers.react(
          getMarkdownContentFromText(description),
          React,
          { components }
        )}
      </Prose>
    </Fragment>
  ))
}
