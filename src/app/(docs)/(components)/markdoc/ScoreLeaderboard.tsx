import { networks } from "../../(content)/miner-networks/networkInfo"
import Table, { LinkCell, SelectColumnFilter } from "../Table"

export default function ScoreLeaderboard({
  type,
}: {
  type: "governance" | "tokenomics" | "ease-of-mining"
}) {
  const data = networks
    .map((item) => {
      const score = item.scores.find((score) => score.type === type)
      if (!score) return

      return {
        id: item.id,
        name: item.title,
        category: item.category,
        categoryPath: `/categories/${item.category}`,
        score: score.value,
        path: `/miner-networks/${item.id}`,
        status: item.status,
      }
    })
    .filter((item) => !!item)

  const columns = [
    {
      Header: "Miner network",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "path",
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: LinkCell,
      hrefAccessor: "categoryPath",
      Filter: SelectColumnFilter,
      filter: "category",
    },
    {
      Header: "Score",
      accessor: "score",
    },
  ]

  const initialState = {
    sortBy: [
      {
        id: "score",
        desc: true,
      },
    ],
  }

  return <Table columns={columns} data={data} initialState={initialState} />
}
