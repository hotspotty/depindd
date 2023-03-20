import { Callout } from "@/app/(docs)/(components)/Callout"
import { QuickLink, QuickLinks } from "@/app/(docs)/(components)/QuickLinks"
import Markdoc, { Config, nodes as defaultNodes } from "@markdoc/markdoc"
import React, { Fragment } from "react"
import { Prose } from "./(components)/Prose"
import { networks } from "./(content)/miner-networks/networkInfo"
import { getMarkdownContentFromText } from "./(utils)/markdown"

const config: Config = {
  nodes: {
    document: {
      render: undefined,
    },
    th: {
      ...defaultNodes.th,
      attributes: {
        ...defaultNodes.th.attributes,
        scope: {
          type: String,
          default: "col",
        },
      },
    },
  },
  tags: {
    callout: {
      render: "Callout",
      attributes: {
        title: { type: String },
        type: {
          type: String,
          default: "note",
          matches: ["note", "warning"],
          errorLevel: "critical",
        },
      },
    },
    scores: {
      render: "Scores",
      attributes: {
        network: { type: String },
      },
    },
    figure: {
      render: "Figure",
      selfClosing: true,
      attributes: {
        src: { type: String },
        alt: { type: String },
        caption: { type: String },
      },
    },
    "quick-links": {
      render: "QuickLinks",
    },
    "quick-link": {
      render: "QuickLink",
      selfClosing: true,
      attributes: {
        title: { type: String },
        description: { type: String },
        icon: { type: String },
        href: { type: String },
      },
    },
  },
}

const scoreTypeTitles = {
  governance: "Governance",
  tokenomics: "Tokenomics",
  "ease-of-mining": "Ease of mining",
}

const components = {
  Figure: ({
    src,
    alt = "",
    caption,
  }: {
    src: string
    alt?: string
    caption?: string
  }) => (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  ),
  Scores: ({ network }: { network: string }) => {
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
  },
  Callout: Callout,
  QuickLinks: QuickLinks,
  QuickLink: QuickLink,
}

export { config, components }
