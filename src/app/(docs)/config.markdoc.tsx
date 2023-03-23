import { Callout } from "@/app/(docs)/(components)/Callout"
import { QuickLink, QuickLinks } from "@/app/(docs)/(components)/QuickLinks"
import { Config, nodes as defaultNodes } from "@markdoc/markdoc"
import Link from "next/link"
import ScoreLeaderboard from "./(components)/ScoreLeaderboard"
import Scores from "./(components)/Scores"

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
    "score-leaderboard": {
      render: "ScoreLeaderboard",
      attributes: {
        type: { type: String },
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
    "internal-link": {
      render: "InternalLink",
      selfClosing: true,
      attributes: {
        title: { type: String },
        href: { type: String },
      },
    },
  },
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
  Scores: Scores,
  Callout: Callout,
  QuickLinks: QuickLinks,
  QuickLink: QuickLink,
  ScoreLeaderboard: ScoreLeaderboard,
  InternalLink: ({ href, title }: { href: string; title: string }) => (
    <Link href={href}>{title}</Link>
  ),
}

export { config, components }
