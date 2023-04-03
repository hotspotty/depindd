import { Callout } from "@/app/(docs)/(components)/markdoc/Callout"
import {
  QuickLink,
  QuickLinks,
} from "@/app/(docs)/(components)/markdoc/QuickLinks"
import { Config, nodes as defaultNodes } from "@markdoc/markdoc"
import Link from "next/link"
import BlockchainProjects from "./(components)/markdoc/BlockchainProjects"
import BlockchainsLeaderboard from "./(components)/markdoc/BlockchainsLeaderboard"
import ComposabilityLeaderboard from "./(components)/markdoc/ComposabilityLeaderboard"
import ContributorsLeaderboard from "./(components)/markdoc/ContributorsLeaderboard"
import InvestorsLeaderboard from "./(components)/markdoc/InvestorsLeaderboard"
import LegoCategoryProjects from "./(components)/markdoc/LegoCategoryProjects"
import MinerProfitabilityLeaderboard from "./(components)/markdoc/MinerProfitabilityLeaderboard"
import TwitterLeaderboard from "./(components)/markdoc/TwitterLeaderboard"
import { blockchainSlugs, categories, legos } from "./(data)/types"

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
    "investors-leaderboard": {
      render: "InvestorsLeaderboard",
      selfClosing: true,
      attributes: {
        minimal: { type: Boolean },
      },
    },
    "contributors-leaderboard": {
      render: "ContributorsLeaderboard",
      selfClosing: true,
      attributes: {
        minimal: { type: Boolean },
      },
    },
    "blockchains-leaderboard": {
      render: "BlockchainsLeaderboard",
      selfClosing: true,
      attributes: {
        minimal: { type: Boolean },
      },
    },
    "twitter-leaderboard": {
      render: "TwitterLeaderboard",
      selfClosing: true,
      attributes: {
        minimal: { type: Boolean },
      },
    },
    "miner-profitability-leaderboard": {
      render: "MinerProfitabilityLeaderboard",
      selfClosing: true,
      attributes: {
        minimal: { type: Boolean },
      },
    },
    "composability-leaderboard": {
      render: "ComposabilityLeaderboard",
      selfClosing: true,
      attributes: {
        minimal: { type: Boolean },
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
        labels: { type: Array },
        icon: { type: String },
        image: { type: String },
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
    "lego-category-projects": {
      render: "LegoCategoryProjects",
      selfClosing: true,
      attributes: {
        lego: {
          type: String,
          matches: legos as any,
        },
        category: { type: String, matches: categories as any },
      },
    },
    "blockchain-projects": {
      render: "BlockchainProjects",
      selfClosing: true,
      attributes: {
        blockchain: {
          type: String,
          matches: blockchainSlugs,
        },
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
  Callout: Callout,
  QuickLinks: QuickLinks,
  QuickLink: QuickLink,
  InvestorsLeaderboard: InvestorsLeaderboard,
  ContributorsLeaderboard: ContributorsLeaderboard,
  BlockchainsLeaderboard: BlockchainsLeaderboard,
  TwitterLeaderboard: TwitterLeaderboard,
  MinerProfitabilityLeaderboard: MinerProfitabilityLeaderboard,
  ComposabilityLeaderboard: ComposabilityLeaderboard,
  InternalLink: ({ href, title }: { href: string; title: string }) => (
    <Link href={href}>{title}</Link>
  ),
  LegoCategoryProjects: LegoCategoryProjects,
  BlockchainProjects: BlockchainProjects,
}

export { config, components }
