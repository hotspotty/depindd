import { investors } from "../../(data)/investors"
import { getLinksMarkdowntext } from "../Links"
import Table, { LinkCell, LinksCell, ProjectsCell } from "../Table"

export default function InvestorsLeaderboard({
  minimal = false,
}: {
  minimal?: boolean
}) {
  const data = investors.map((investor) => {
    return {
      id: investor.id,
      name: investor.title,
      website: investor.website,
      imagePath: investor.logo,
      twitterHandle: `@${investor.twitterUsername}`,
      twitterUrl: `https://twitter.com/${investor.twitterUsername}`,
      links: getLinksMarkdowntext(
        [{ title: "Blog", url: investor.blog }].filter(
          (x) => x.url != null
        ) as { title: string; url: string }[]
      ),
      investmentsCount: investor.investments.length,
      projectSlugs: investor.investments.join(","),
    }
  })

  const columns = [
    {
      Header: "Investor",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "website",
      linkTarget: "_blank",
      imageAccessor: "imagePath",
      secondLinkTitleAccessor: "twitterHandle",
      secondLinkHrefAccessor: "twitterUrl",
      secondLinkTarget: "_blank",
    },
    {
      Header: "Links",
      accessor: "links",
      Cell: LinksCell,
    },
    {
      Header: "Projects",
      accessor: "projectSlugs",
      Cell: ProjectsCell,
    },
    {
      Header: "Investments",
      accessor: "investmentsCount",
    },
  ]

  const initialState = {
    hiddenColumns: minimal ? ["links"] : [],
    sortBy: [
      {
        id: "investmentsCount",
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
