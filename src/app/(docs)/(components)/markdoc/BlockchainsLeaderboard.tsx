import { blockchainInfo } from "../../(data)/blockchains"
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
          website: string
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
      // TODO: refactor blockchainInfo to blockchains
      if (!blockchainInfo[blockchain]) return result

      if (!result[blockchain]) {
        result[blockchain] = {
          projects: 1,
          name: blockchainInfo[blockchain].title,
          website: blockchainInfo[blockchain].links.find(
            ({ type }) => type === "website"
          )?.url!, // TODO: remove exclamation mark
          imagePath: blockchainInfo[blockchain].logo,
          token: `$${blockchainInfo[blockchain].token}`,
          coingecko: blockchainInfo[blockchain].links.find(
            ({ type }) => type === "coingecko"
          )?.url!, // TODO: remove exclamation mark
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
      hrefAccessor: "website",
      linkTarget: "_blank",
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
