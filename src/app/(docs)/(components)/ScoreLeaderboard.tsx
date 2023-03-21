import fs from "fs"
import matter from "gray-matter"
import path from "path"
import Table, { LinkCell, SelectColumnFilter } from "../(components)/Table"
import { networks } from "../(content)/miner-networks/networkInfo"
import { CONTENT_PATH } from "../(utils)/sidebar"

export default function ScoreLeaderboard({
  type,
}: {
  type: "governance" | "tokenomics" | "ease-of-mining"
}) {
  const data = networks
    .map((item) => {
      const score = item.scores.find((score) => score.type === type)
      if (!score) return

      const filePath = path.join(
        CONTENT_PATH,
        "miner-networks",
        item.id + ".md"
      )
      const source = fs.readFileSync(filePath, "utf-8")
      const matterResult = matter(source)

      return {
        id: item.id,
        name: matterResult.data.title,
        category: item.category,
        categoryPath: `/categories/${item.category}`,
        score: score.value,
        path: `/${item.category}/${item.id}`,
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
