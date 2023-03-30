import { projects } from "../../(data)/projects"
import { getLinksMarkdowntext } from "../Links"
import Table, { LinkCell, LinksCell, NumberCell } from "../Table"

export default async function TwitterLeaderboard() {
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
        links: getLinksMarkdowntext(
          [
            {
              title: `@${item.twitter_username}`,
              url: `https://twitter.com/${item.twitter_username}`,
            },
          ].filter((x) => x.url != null) as { title: string; url: string }[]
        ),
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
    },
    {
      Header: "Twitter",
      accessor: "links",
      Cell: LinksCell,
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
    sortBy: [
      {
        id: "followers",
        desc: true,
      },
    ],
  }

  return <Table columns={columns} data={data} initialState={initialState} />
}
