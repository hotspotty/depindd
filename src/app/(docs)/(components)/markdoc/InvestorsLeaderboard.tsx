import { investors } from "../../(content)/(data)/investors"
import Table, { LinkCell, LinksCell } from "../Table"
import { getLinksMarkdowntext } from "./Links"

export default function InvestorsLeaderboard() {
  const data = investors.map((item) => {
    return {
      id: item.id,
      name: item.title,
      website: item.website,
      links: getLinksMarkdowntext(
        [
          { title: "Twitter", url: item.twitter },
          { title: "Blog", url: item.blog },
        ].filter((x) => x.url != null) as { title: string; url: string }[]
      ),
      investmentsCount: item.investments.length,
    }
  })

  const columns = [
    {
      Header: "Investor",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "website",
      linkTarget: "_blank",
    },
    {
      Header: "Links",
      accessor: "links",
      Cell: LinksCell,
    },
    {
      Header: "DePIN Investments",
      accessor: "investmentsCount", // TODO: add links to investments
    },
  ]

  const initialState = {
    sortBy: [
      {
        id: "investmentsCount",
        desc: true,
      },
    ],
  }

  return <Table columns={columns} data={data} initialState={initialState} />
}
