import { projects } from "../../(data)/projects"
import Table, { CurrencyCell, LinkCell, NumberCell } from "../Table"

export default async function MinerPaybackTimeLeaderboard() {
  const req = await fetch("https://api.depindd.com/api/v1/projects/", {
    next: { revalidate: 10 },
  } as any)
  const projectsData = (await req.json()) as {
    [project: string]: {
      name: string
      stats: {
        active_miners: number
        total_miners: number
        token_price: number
      }
      payback_time: {
        monthly_rewards_distribution: number
        avg_hardware_price: number
        avg_monthly_rewards: number
        avg_monthly_rewards_usd: number
        months_to_break_even: number
      }
    }
  }

  const data = Object.values(projectsData)
    .map(({ name, stats, payback_time }) => {
      const projectInfo = projects.find((project) => project.slug === name)

      if (!projectInfo) return

      return {
        name: projectInfo.title,
        path: `/projects/${name}`,
        activeMiners: stats.active_miners,
        averageMinerPrice: payback_time.avg_hardware_price,
        averageMonthlyRewardsUsd: payback_time.avg_monthly_rewards_usd,
        monthsToBreakEven: payback_time.months_to_break_even,
      }
    })
    .filter((x) => x)

  const columns = [
    {
      Header: "Project",
      accessor: "name",
      Cell: LinkCell,
      hrefAccessor: "path",
    },
    {
      Header: "Active miners",
      accessor: "activeMiners",
      Cell: NumberCell,
    },
    {
      Header: "Avg miner price",
      accessor: "averageMinerPrice",
      Cell: CurrencyCell,
    },
    {
      Header: "Avg monthly rewards",
      accessor: "averageMonthlyRewardsUsd",
      Cell: CurrencyCell,
    },
    {
      Header: "Months to payback",
      accessor: "monthsToBreakEven",
      Cell: NumberCell,
    },
  ]

  const initialState = {
    sortBy: [
      {
        id: "monthsToBreakEven",
        desc: false,
      },
    ],
  }

  return <Table columns={columns} data={data} initialState={initialState} />
}
