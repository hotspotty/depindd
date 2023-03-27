import { projects } from "../../(data)/projects"
import Table, { LinkCell, SelectColumnFilter } from "../Table"

export default function ScoreLeaderboard({
  type,
}: {
  type: "governance" | "tokenomics" | "ease-of-mining"
}) {
  const data = projects
    .map((item) => {
      const score = item.scores.find((score) => score.type === type)
      if (!score) return

      return {
        id: item.slug,
        name: item.title,
        lego: item.lego,
        categoryPath: `/lego/${item.lego}`,
        score: score.value,
        path: `/projects/${item.slug}`,
        status: item.status,
      }
    })
    .filter((item) => !!item)

  const columns = [
    {
      Header: "Project",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "path",
    },
    {
      Header: "Category",
      accessor: "lego",
      Cell: LinkCell,
      hrefAccessor: "categoryPath",
      Filter: SelectColumnFilter,
      filter: "lego",
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
