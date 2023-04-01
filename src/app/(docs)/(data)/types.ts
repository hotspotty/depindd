interface Miner {
  title: string
  url: string
  price: number
}

export const projectLinkValidationPattern =
  "(?:website|foundation|company|blog|medium|twitter|reddit|forum|discord|telegram|youtube|instagram|linkedin|tiktok|facebook|github|whitepaper|documentation|governance|tokenomics|explorer|shop|coingecko|analytics|crunchbase|other)"

export interface LinkItem {
  label?: string
  type:
    | "website"
    | "foundation"
    | "company"
    | "blog"
    | "medium"
    | "twitter"
    | "reddit"
    | "forum"
    | "discord"
    | "telegram"
    | "youtube"
    | "instagram"
    | "linkedin"
    | "tiktok"
    | "facebook"
    | "github"
    | "whitepaper"
    | "documentation"
    | "governance"
    | "tokenomics"
    | "explorer"
    | "shop"
    | "coingecko"
    | "analytics"
    | "crunchbase"
    | "other"
  url: string
}

export const projectCategoryValidationPattern =
  "(?:connectivity|positioning|mobility|energy|environmental|healthcare|smart city|smart home|geo-location|general|storage|marketplace|proof|warehouse|analytics|tool|compute|CDN|VPN|manufacturer)"

export type Category =
  | "connectivity"
  | "positioning"
  | "mobility"
  | "energy"
  | "environmental"
  | "healthcare"
  | "smart city"
  | "smart home"
  | "geo-location"
  | "general"
  | "storage"
  | "marketplace"
  | "proof"
  | "warehouse"
  | "analytics"
  | "tool"
  | "compute"
  | "CDN"
  | "VPN"
  | "manufacturer"

export const projectLegoValidationPattern =
  "(?:data|sensors|servers|wireless|hardware)"

export type Lego = "data" | "sensors" | "servers" | "wireless" | "hardware"

export const projectStatusValidationPattern = "(?:development|production)"

export type Status = "development" | "production"

export interface ProjectInfo {
  slug: string // Project filename
  title: string
  miners: Miner[]
  lego: Lego
  categories: Category[]
  token: string // All caps, no dollar sign. E.g. HNT
  blockchain: string // Possible values are in /src/scripts/validate.ts
  status: Status
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

// "tbd": This is for projects that have yet to decide which blockchain they will use
// "n/a": This is for projects that don't plan to have a token
export const blockchainValidationPattern =
  "(?:tbd|n/a|solana|polygon|iotex|algorand|bsc|constellation|kadena|cardano|ethereum|polkadot)"

export interface InvestorInfo {
  id: string
  title: string
  website: string
  twitterUsername?: string
  blog?: string
  logo: string
  investments: string[] // Slugs of projects
}
