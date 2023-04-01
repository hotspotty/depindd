import { blockchains } from "../../(data)/blockchains"
import { Category, Lego, projects } from "../../(data)/projects"
import Table, { LinkCell } from "../Table"

export default async function BlockchainsLeaderboard({
  minimal = false,
}: {
  minimal?: boolean
}) {
  const aggregation = projects.reduce(
    (
      result: {
        [blockchain: string]: {
          projects: number
          name: string
          path: string
          token: string
          imagePath: string
          coingecko: string
          legos: Lego[]
          legosCount: number
          categories: Category[]
          categoriesCount: number
        }
      },
      { lego, categories, blockchain }
    ) => {
      const blockchainInfo = blockchains.find(({ slug }) => slug === blockchain)
      if (!blockchainInfo) return result

      if (!result[blockchain]) {
        result[blockchain] = {
          projects: 1,
          name: blockchainInfo.title,
          path: `/blockchains/${blockchainInfo.slug}`,
          imagePath: blockchainInfo.logo,
          token: `$${blockchainInfo.token}`,
          coingecko: blockchainInfo.links.find(
            ({ type }) => type === "coingecko"
          )?.url,
          legos: [lego],
          legosCount: 1,
          categories: [...categories],
          categoriesCount: categories.length,
        }
        return result
      }

      result[blockchain].projects++

      if (!result[blockchain].legos.includes(lego)) {
        result[blockchain].legos.push(lego)
        result[blockchain].legosCount++
      }

      categories.forEach((category) => {
        if (!result[blockchain].categories.includes(category)) {
          result[blockchain].categories.push(category)
          result[blockchain].categoriesCount++
        }
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
      Header: "LEGOs",
      accessor: "legosCount",
    },
    {
      Header: "Categories",
      accessor: "categoriesCount",
    },
    {
      Header: "DePIN projects",
      accessor: "projects",
    },
  ]

  const initialState = {
    hiddenColumns: minimal ? ["legosCount", "categoriesCount"] : [],
    sortBy: [
      {
        id: "projects",
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
