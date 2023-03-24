export interface InvestorInfo {
  id: string
  title: string
  investments: string[] // IDs of miner networks
  website: string
  twitter?: string
  blog?: string
}

export const investors: InvestorInfo[] = [
  {
    id: "samsung-next",
    title: "Samsung Next",
    website: "https://www.samsungnext.com",
    twitter: "https://twitter.com/samsungnext",
    blog: "https://www.samsungnext.com/blog",
    investments: [],
  },
  {
    id: "escape-velocity",
    title: "Escape Velocity",
    website: "https://ev3.xyz",
    twitter: "https://twitter.com/EV3ventures",
    blog: "https://ev3.xyz",
    investments: [],
  },
  {
    id: "borderless-capital",
    title: "Borderless Capital",
    website: "https://www.borderlesscapital.io",
    twitter: "https://twitter.com/borderless_cap",
    blog: "https://medium.com/borderless-capital",
    investments: [],
  },
  {
    id: "multicoin-capital",
    title: "Multicoin Capital",
    website: "https://multicoin.capital",
    twitter: "https://twitter.com/multicoincap",
    blog: "https://multicoin.capital/writing",
    investments: ["helium-iot", "hivemapper"],
  },
  {
    id: "dispersion-capital",
    title: "Dispersion Capital",
    website: "https://dispersion.xyz",
    twitter: "https://twitter.com/DispersionVC",
    investments: [],
  },
  {
    id: "lattice",
    title: "Lattice",
    website: "https://lattice.fund",
    twitter: "https://twitter.com/lattice_fund",
    blog: "https://lattice.mirror.xyz",
    investments: ["dimo"],
  },
  {
    id: "future-money-group",
    title: "FutureMoney Group",
    website: "https://www.fmgroup.xyz",
    twitter: "https://twitter.com/FutureMoneyVC",
    blog: "https://medium.com/@0xfu",
    investments: ["helium-iot"],
  },
]
