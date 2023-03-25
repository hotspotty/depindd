import { Callout } from "@/app/(docs)/(components)/markdoc/Callout"
import {
  QuickLink,
  QuickLinks,
} from "@/app/(docs)/(components)/markdoc/QuickLinks"
import { Config, nodes as defaultNodes } from "@markdoc/markdoc"
import Link from "next/link"
import ContributorsLeaderboard from "./(components)/markdoc/ContributorsLeaderboard"
import InvestorsLeaderboard from "./(components)/markdoc/InvestorsLeaderboard"
import Links from "./(components)/markdoc/Links"
import ScoreLeaderboard from "./(components)/markdoc/ScoreLeaderboard"
import Scores from "./(components)/markdoc/Scores"

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
      selfClosing: true,
      attributes: {
        project: { type: String },
      },
    },
    "score-leaderboard": {
      render: "ScoreLeaderboard",
      selfClosing: true,
      attributes: {
        type: { type: String },
      },
    },
    "investors-leaderboard": {
      render: "InvestorsLeaderboard",
      selfClosing: true,
    },
    "contributors-leaderboard": {
      render: "ContributorsLeaderboard",
      selfClosing: true,
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
        labels: { type: Array },
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
    links: {
      render: "Links",
      selfClosing: true,
      attributes: {
        project: { type: String },
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
  InvestorsLeaderboard: InvestorsLeaderboard,
  ContributorsLeaderboard: ContributorsLeaderboard,
  InternalLink: ({ href, title }: { href: string; title: string }) => (
    <Link href={href}>{title}</Link>
  ),
  Links: Links,
}

export { config, components }
