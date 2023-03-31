import { projects } from "../../(data)/projects"
import Table, { LinkCell, NumberCell } from "../Table"

export default async function TwitterLeaderboard({
  minimal = false,
}: {
  minimal?: boolean
}) {
  const req = await fetch("https://api.depindd.com/api/v1/projects/socials/", {
    next: { revalidate: 10 },
  } as any)
  const twitterData = (await req.json()) as {
    twitter: {
      name: string
      twitter_username: string
      twitter_followers: number
      tweets: number
    }[]
  }

  const data = twitterData.twitter
    .map((item) => {
      const projectInfo = projects.find((project) => project.slug === item.name)

      if (!projectInfo) return

      return {
        name: projectInfo.title,
        path: `/projects/${item.name}`,
        imagePath: projectInfo.logo,
        twitterHandle: `@${item.twitter_username}`,
        twitterUrl: `https://twitter.com/${item.twitter_username}`,
        tweets: item.tweets || 0,
        followers: item.twitter_followers || 0,
      }
    })
    .filter((x) => x)

  const columns = [
    {
      Header: "Project",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "path",
      imageAccessor: "imagePath",
      secondLinkTitleAccessor: "twitterHandle",
      secondLinkHrefAccessor: "twitterUrl",
      secondLinkTarget: "_blank",
    },
    {
      Header: "Tweets",
      accessor: "tweets",
      Cell: NumberCell,
    },
    {
      Header: "Followers",
      accessor: "followers",
      Cell: NumberCell,
    },
  ]

  const initialState = {
    hiddenColumns: minimal ? ["tweets"] : [],
    sortBy: [
      {
        id: "followers",
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
