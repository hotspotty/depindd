export interface InvestorInfo {
  id: string
  title: string
  website: string
  twitterUsername?: string
  blog?: string
  logo: string
  investments: string[] // IDs of projects
}

export const investors: InvestorInfo[] = [
  {
    id: "samsung-next",
    title: "Samsung Next",
    website: "https://www.samsungnext.com",
    twitterUsername: "samsungnext",
    blog: "https://www.samsungnext.com/blog",
    logo: "/images/investors/samsung-next.png",
    investments: [],
  },
  {
    id: "escape-velocity",
    title: "Escape Velocity",
    website: "https://ev3.xyz",
    twitterUsername: "EV3ventures",
    blog: "https://ev3.xyz",
    logo: "/images/investors/escape-velocity.jpeg",
    investments: [],
  },
  {
    id: "borderless-capital",
    title: "Borderless Capital",
    website: "https://www.borderlesscapital.io",
    twitterUsername: "borderless_cap",
    blog: "https://medium.com/borderless-capital",
    logo: "/images/investors/borderless-capital.jpeg",
    investments: [],
  },
  {
    id: "multicoin-capital",
    title: "Multicoin Capital",
    website: "https://multicoin.capital",
    twitterUsername: "multicoincap",
    blog: "https://multicoin.capital/writing",
    logo: "/images/investors/multicoin-capital.jpeg",
    investments: ["helium-iot", "hivemapper"],
  },
  {
    id: "dispersion-capital",
    title: "Dispersion Capital",
    website: "https://dispersion.xyz",
    twitterUsername: "DispersionVC",
    logo: "/images/investors/dispersion-capital.jpeg",
    investments: [],
  },
  {
    id: "lattice",
    title: "Lattice",
    website: "https://lattice.fund",
    twitterUsername: "lattice_fund",
    blog: "https://lattice.mirror.xyz",
    logo: "/images/investors/lattice.png",
    investments: ["dimo"],
  },
  {
    id: "future-money-group",
    title: "FutureMoney Group",
    website: "https://www.fmgroup.xyz",
    twitterUsername: "FutureMoneyVC",
    blog: "https://medium.com/@0xfu",
    logo: "/images/investors/future-money-group.jpeg",
    investments: ["helium-iot"],
  },
]
