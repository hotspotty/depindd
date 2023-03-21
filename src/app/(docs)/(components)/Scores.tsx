import { networks } from "@/app/(docs)/(content)/miner-networks/networkInfo"
import Markdoc from "@markdoc/markdoc"
import React, { Fragment } from "react"
import { getMarkdownContentFromText } from "../(utils)/markdown"
import { components } from "../config.markdoc"
import { Prose } from "./Prose"

const scoreTypeTitles = {
  governance: "Governance",
  tokenomics: "Tokenomics",
  "ease-of-mining": "Ease of mining",
}

export default function Scores({ network }: { network: string }) {
  const networkInfo = networks.find((item) => item.id === network)

  if (!networkInfo || networkInfo.scores.length === 0) return

  return (
    <>
      <h2>Scores</h2>
      <p>1-10, 10 being best</p>
      {networkInfo.scores.map(({ type, value, description }) => (
        <Fragment key={type}>
          <h3>
            {scoreTypeTitles[type]}: {value}/10
          </h3>
          <Prose>
            {Markdoc.renderers.react(
              getMarkdownContentFromText(description),
              React,
              { components }
            )}
          </Prose>
        </Fragment>
      ))}
    </>
  )
}
