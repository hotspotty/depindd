import { contributors } from "../../(data)/contributors"
import Table, { LinkCell } from "../Table"

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

export default async function ContributorsLeaderboard({
  minimal = false,
}: {
  minimal?: boolean
}) {
  const req = await fetch(
    "https://api.depindd.com/api/v1/depindd/contributors/"
  )
  const githubContributors = (await req.json()) as GithubUser[]

  const data = contributors.map(
    ({ name, githubHandle, twitter, company, companyWebsite }) => {
      const githubUser = githubContributors.find(
        (x) => x.login === githubHandle
      )
      return {
        name,
        githubLink: `https://github.com/${githubHandle}`,
        imagePath: githubUser?.avatar_url || "/android-chrome-192x192.png",
        twitterHandle: `@${twitter}`,
        twitterUrl: `https://twitter.com/${twitter}`,
        company,
        companyWebsite,
        contributions: githubUser?.contributions || 0,
      }
    }
  )

  const columns = [
    {
      Header: "Contributor",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "githubLink",
      imageAccessor: "imagePath",
      linkTarget: "_blank",
      secondLinkTitleAccessor: "twitterHandle",
      secondLinkHrefAccessor: "twitterUrl",
      secondLinkTarget: "_blank",
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
    hiddenColumns: minimal ? ["company"] : [],
    sortBy: [
      {
        id: "contributions",
        desc: true,
      },
    ],
    pageSize: minimal ? 3 : 5,
  }

  return (
    <Table
      columns={columns}
      data={data}
      initialState={initialState}
      minimal={minimal}
    />
  )
}
