import { blockchains } from "./blockchains"

interface Miner {
  title: string
  url: string
  price: number
}

export const linkTypes = [
  "website",
  "foundation",
  "company",
  "blog",
  "medium",
  "twitter",
  "reddit",
  "forum",
  "discord",
  "telegram",
  "youtube",
  "instagram",
  "linkedin",
  "tiktok",
  "facebook",
  "github",
  "whitepaper",
  "documentation",
  "governance",
  "tokenomics",
  "explorer",
  "shop",
  "coingecko",
  "analytics",
  "crunchbase",
  "other",
] as const

export type LinkType = (typeof linkTypes)[number]

export interface LinkItem {
  label?: string
  type: LinkType
  url: string
}

export const legos = [
  "wireless",
  "sensors",
  "data",
  "servers",
  "hardware",
] as const

export type Lego = (typeof legos)[number]

export const categories = [
  "connectivity",
  "positioning",
  "mobility",
  "energy",
  "environmental",
  "healthcare",
  "smart city",
  "smart home",
  "geo-location",
  "general",
  "storage",
  "marketplace",
  "proof",
  "warehouse",
  "analytics",
  "tool",
  "compute",
  "CDN",
  "VPN",
  "manufacturer",
] as const

export type Category = (typeof categories)[number]

export const legoCategories: { [lego: string]: Category[] } = {
  wireless: ["connectivity", "positioning"],
  sensors: [
    "mobility",
    "energy",
    "environmental",
    "healthcare",
    "smart city",
    "smart home",
    "geo-location",
    "general",
  ],
  data: ["storage", "marketplace", "proof", "warehouse", "analytics", "tool"],
  servers: ["compute", "CDN", "VPN"],
  hardware: ["manufacturer", "marketplace"],
}

export const projectStatuses = ["development", "production"] as const

export type ProjectStatus = (typeof projectStatuses)[number]

export interface ProjectInfo {
  slug: string // Project filename
  title: string
  miners: Miner[]
  lego: Lego
  categories: Category[]
  token: string // All caps, no dollar sign. E.g. HNT
  blockchain: string // Possible values are the blockchains listed in /src/app/(docs)/(pages)/blockchains
  // In /src/scripts/validate.ts there is an allowance for "tbd" and "n/a" as well
  status: ProjectStatus
  logo: string // Download the logo (e.g. from the twitter account) and link to it: `/public/images/projects/<id>.png`
  links: LinkItem[]
}

export interface BlockchainInfo {
  slug: string
  title: string
  token: string
  logo: string
  links: LinkItem[]
}

export const blockchainSlugs = blockchains.map(({ slug }) => slug)

export interface InvestorInfo {
  id: string
  title: string
  website: string
  twitterUsername?: string
  blog?: string
  logo: string
  investments: string[] // Slugs of projects
}
