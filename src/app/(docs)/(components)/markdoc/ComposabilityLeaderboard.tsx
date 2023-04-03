import { projects } from "../../(data)/projects"
import Table, { LinkCell, ProjectsCell } from "../Table"

export default async function ComposabilityLeaderboard({
  minimal = false,
}: {
  minimal?: boolean
}) {
  const data = projects
    .map(({ slug, title, logo, token, links, usedBy }) => {
      if (usedBy.length === 0) return

      const coingecko = links.find((link) => link.type === "coingecko")?.url

      return {
        name: title,
        path: `/projects/${slug}`,
        imagePath: logo,
        token: `$${token}`,
        coingecko: coingecko,
        usedByProjectSlugs: usedBy.join(","),
        usedByProjectCount: usedBy.length,
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
      secondLinkTitleAccessor: "token",
      secondLinkHrefAccessor: "coingecko",
      secondLinkTarget: "_blank",
    },
    {
      Header: "Used by",
      accessor: "usedByProjectCount",
      Cell: ProjectsCell,
      projectSlugsAccessor: "usedByProjectSlugs",
    },
  ]

  const initialState = {
    sortBy: [
      {
        id: "usedByProjectCount",
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
