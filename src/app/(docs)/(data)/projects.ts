import twoblox from "@/app/(docs)/(pages)/projects/2blox.json"
import arkreen from "@/app/(docs)/(pages)/projects/arkreen.json"
import dimo from "@/app/(docs)/(pages)/projects/dimo.json"
import element from "@/app/(docs)/(pages)/projects/element.json"
import envirobloq from "@/app/(docs)/(pages)/projects/envirobloq.json"
import fryFoundation from "@/app/(docs)/(pages)/projects/fry-foundation.json"
import geodnet from "@/app/(docs)/(pages)/projects/geodnet.json"
import getdor from "@/app/(docs)/(pages)/projects/getdor.json"
import greenPowerNetwork from "@/app/(docs)/(pages)/projects/green-power-network.json"
import healthblocks from "@/app/(docs)/(pages)/projects/healthblocks.json"
import heliumIot from "@/app/(docs)/(pages)/projects/helium-iot.json"
import heliumMobile from "@/app/(docs)/(pages)/projects/helium-mobile.json"
import hivemapper from "@/app/(docs)/(pages)/projects/hivemapper.json"
import react from "@/app/(docs)/(pages)/projects/react.json"
import xnet from "@/app/(docs)/(pages)/projects/xnet.json"

interface Miner {
  name: string
  url: string
  price: number
}

interface Score {
  type: "governance" | "tokenomics" | "ease-of-mining"
  value: number
  description: string
}

interface LinkItem {
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

type Blockchain =
  | "solana"
  | "polygon"
  | "iotex"
  | "algorand"
  | "bsc"
  | "hypergraph"

export interface ProjectInfo {
  slug: string // Project filename
  title: string
  miners: Miner[]
  scores: Score[]
  lego: "data" | "sensors" | "servers" | "wireless" | "hardware"
  categories: Category[]
  token: string // All caps, no dollar sign. E.g. HNT
  blockchain: Blockchain
  status: "development" | "production"
  logo: string // Download the logo (e.g. from the twitter account) and link to it: `/public/images/projects/<id>.png`
  links: LinkItem[]
}

export const projects: ProjectInfo[] = [
  dimo as ProjectInfo,
  heliumIot as ProjectInfo,
  heliumMobile as ProjectInfo,
  hivemapper as ProjectInfo,
  xnet as ProjectInfo,
  react as ProjectInfo,
  arkreen as ProjectInfo,
  twoblox as ProjectInfo,
  envirobloq as ProjectInfo,
  geodnet as ProjectInfo,
  element as ProjectInfo,
  fryFoundation as ProjectInfo,
  getdor as ProjectInfo,
  greenPowerNetwork as ProjectInfo,
  healthblocks as ProjectInfo,
]
