import { projects } from "../../(data)/projects"
import Table, { LinkCell, SelectColumnFilter } from "../Table"

export default function ScoreLeaderboard({
  type,
}: {
  type: "governance" | "tokenomics" | "ease-of-mining"
}) {
  const data = projects
    .map((project) => {
      const score = project.scores.find((score) => score.type === type)
      if (!score) return

      return {
        id: project.slug,
        name: project.title,
        imagePath: project.logo,
        lego: project.lego,
        legoPath: `/lego/${project.lego}`,
        score: score.value,
        path: `/projects/${project.slug}`,
        status: project.status,
      }
    })
    .filter((item) => !!item)

  const columns = [
    {
      Header: "Project",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "path",
      imageAccessor: "imagePath",
    },
    {
      Header: "LEGO",
      accessor: "lego",
      Cell: LinkCell,
      hrefAccessor: "legoPath",
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
