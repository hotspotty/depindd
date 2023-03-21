import { Callout } from "@/app/(docs)/(components)/Callout"
import { QuickLink, QuickLinks } from "@/app/(docs)/(components)/QuickLinks"
import Markdoc, { Config, nodes as defaultNodes } from "@markdoc/markdoc"
import fs from "fs"
import matter from "gray-matter"
import path from "path"
import React, { Fragment } from "react"
import { Prose } from "./(components)/Prose"

import Table, { LinkCell, SelectColumnFilter } from "./(components)/Table"
import { networks } from "./(content)/miner-networks/networkInfo"
import { getMarkdownContentFromText } from "./(utils)/markdown"
import { CONTENT_PATH } from "./(utils)/sidebar"

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
    "data-table": {
      render: "DataTable",
      attributes: {
        id: { type: String },
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
  DataTable: ({ id }: { id: string }) => {
    // TODO: improve implementation
    if (id !== "governance-score") return

    const data = networks
      .map((item) => {
        const score = item.scores.find((score) => score.type === "governance")
        if (!score) return

        const filePath = path.join(
          CONTENT_PATH,
          "miner-networks",
          item.id + ".md"
        )
        const source = fs.readFileSync(filePath, "utf-8")
        const matterResult = matter(source)

        return {
          id: item.id,
          name: matterResult.data.title,
          category: item.category,
          categoryPath: `/categories/${item.category}`,
          score: score.value,
          path: `/${item.category}/${item.id}`,
          status: item.status,
        }
      })
      .filter((item) => !!item)

    const columns = [
      {
        Header: "Miner network",
        accessor: "name",
        Cell: LinkCell,
        hrefAccessor: "path",
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: LinkCell,
        hrefAccessor: "categoryPath",
        Filter: SelectColumnFilter,
        filter: "category",
      },
      {
        Header: "Score",
        accessor: "score",
      },
    ]

    const initialState = {
      sortBy: [
        {
          id: "score",
          desc: true,
        },
      ],
    }

    return <Table columns={columns} data={data} initialState={initialState} />
  },
}

export { config, components }
