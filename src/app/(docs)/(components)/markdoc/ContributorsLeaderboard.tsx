import { contributors } from "../../(data)/contributors"
import { getLinksMarkdowntext } from "../Links"
import Table, { LinkCell, LinksCell } from "../Table"

interface GithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: "User"
  site_admin: boolean
  contributions: number
}

export default async function ContributorsLeaderboard() {
  const req = await fetch(
    "https://api.github.com/repos/hotspotty/depindd/contributors",
    { cache: "no-cache" }
  )
  const githubContributors = (await req.json()) as GithubUser[]

  const data = contributors.map((item) => {
    const githubUser = githubContributors.find(
      (x) => x.login === item.githubHandle
    )
    return {
      name: item.name,
      githubLink: `https://github.com/${item.githubHandle}`,
      company: item.company,
      companyWebsite: item.companyWebsite,
      links: getLinksMarkdowntext(
        [{ title: "Twitter", url: item.twitter }].filter(
          (x) => x.url != null
        ) as { title: string; url: string }[]
      ),
      contributions: githubUser?.contributions || 0,
    }
  })

  const columns = [
    {
      Header: "Contributor",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "githubLink",
      linkTarget: "_blank",
    },
    {
      Header: "Links",
      accessor: "links",
      Cell: LinksCell,
    },
    {
      Header: "Company",
      accessor: "company",
      Cell: LinkCell,
      hrefAccessor: "companyWebsite",
      linkTarget: "_blank",
    },
    {
      Header: "Contributions",
      accessor: "contributions",
    },
  ]

  const initialState = {
    sortBy: [
      {
        id: "contributions",
        desc: true,
      },
    ],
  }

  return <Table columns={columns} data={data} initialState={initialState} />
}
