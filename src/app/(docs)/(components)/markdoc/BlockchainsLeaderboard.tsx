import { blockchains } from "../../(data)/blockchains"
import { projects } from "../../(data)/projects"
import Table, { LinkCell, ProjectsCell } from "../Table"

export default async function BlockchainsLeaderboard({
  minimal = false,
}: {
  minimal?: boolean
}) {
  const aggregation = projects.reduce(
    (
      result: {
        [blockchain: string]: {
          name: string
          path: string
          token: string
          imagePath: string
          coingecko: string | undefined
          projectSlugs: string
          projectCount: number
        }
      },
      project
    ) => {
      project.blockchains.forEach((blockchainSlug) => {
        const blockchainInfo = blockchains.find(
          ({ slug }) => slug === blockchainSlug
        )

        if (!blockchainInfo) return

        if (!result[blockchainSlug]) {
          result[blockchainSlug] = {
            name: blockchainInfo.title,
            path: `/blockchains/${blockchainInfo.slug}`,
            imagePath: blockchainInfo.logo,
            token: `$${blockchainInfo.token}`,
            coingecko: blockchainInfo.links.find(
              ({ type }) => type === "coingecko"
            )?.url,
            projectSlugs: project.slug,
            projectCount: 1,
          }
          return
        }

        result[blockchainSlug].projectSlugs += "," + project.slug
        result[blockchainSlug].projectCount++
      })

      return result
    },
    {}
  )

  const data = Object.values(aggregation)

  const columns = [
    {
      Header: "Blockchain",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "path",
      imageAccessor: "imagePath",
      secondLinkTitleAccessor: "token",
      secondLinkHrefAccessor: "coingecko",
      secondLinkTarget: "_blank",
    },
    {
      Header: "Projects",
      accessor: "projectCount",
      Cell: ProjectsCell,
      projectSlugsAccessor: "projectSlugs",
    },
  ]

  const initialState = {
    sortBy: [
      {
        id: "projectCount",
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
