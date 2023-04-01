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
      { slug, lego, categories, blockchain }
    ) => {
      const blockchainInfo = blockchains.find(({ slug }) => slug === blockchain)
      if (!blockchainInfo) return result

      if (!result[blockchain]) {
        result[blockchain] = {
          name: blockchainInfo.title,
          path: `/blockchains/${blockchainInfo.slug}`,
          imagePath: blockchainInfo.logo,
          token: `$${blockchainInfo.token}`,
          coingecko: blockchainInfo.links.find(
            ({ type }) => type === "coingecko"
          )?.url,
          projectSlugs: slug,
          projectCount: 1,
        }
        return result
      }

      result[blockchain].projectSlugs += "," + slug
      result[blockchain].projectCount++

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
      accessor: "projectSlugs",
      Cell: ProjectsCell,
    },
    {
      Header: "Projects",
      accessor: "projectCount",
    },
  ]

  const initialState = {
    hiddenColumns: minimal ? ["projectSlugs"] : [],
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
