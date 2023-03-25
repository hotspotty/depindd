import { projects } from "@/app/(docs)/(data)/projects"
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

export default function Scores({ project }: { project: string }) {
  const projectInfo = projects.find((item) => item.id === project)

  if (!projectInfo || projectInfo.scores.length === 0) {
    return <p>TBD</p>
  }

  return projectInfo.scores.map(({ type, value, description }) => (
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
