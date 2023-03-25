export interface ContributorInfo {
  githubHandle: string
  name: string
  twitter?: string
  blog?: string
  company?: string
  companyWebsite?: string
}

export const contributors: ContributorInfo[] = [
  {
    githubHandle: "mugoosse",
    name: "Maxime Goossens",
    company: "Hotspotty",
    companyWebsite: "https://hotspotty.net",
    twitter: "maxime_goossens",
  },
  {
    githubHandle: "dansku",
    name: "Daniel Andrade",
    company: "Hotspotty",
    companyWebsite: "https://hotspotty.net",
    twitter: "dspillere",
  },
  {
    githubHandle: "dannpl",
    name: "Daniel Cardoso",
    company: "Hotspotty",
    companyWebsite: "https://hotspotty.net",
    twitter: "dannpl",
  },
  {
    githubHandle: "danielzabotti",
    name: "Daniel Zabotti",
    company: "Hotspotty",
    companyWebsite: "https://hotspotty.net",
    twitter: "danielzabotti",
  },
  {
    githubHandle: "vinigoess",
    name: "Vinicius Goes",
    company: "Hotspotty",
    companyWebsite: "https://hotspotty.net",
    twitter: "goesUX",
  },
  {
    githubHandle: "andrew-iotx",
    name: "Andrew Law",
    company: "IoTeX",
    companyWebsite: "https://iotex.io",
    twitter: "dr_andrewlaw",
  },
]
