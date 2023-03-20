import clsx from "clsx"
import { redirect } from "next/navigation"

const metadata = {
  title: "DePIN DD",
}

const Home: React.FC = () => {
  let earnSelected = "Mine"

  const earnSelectedItems = () => {
    const earnMethod = EARN_METHODS.find(
      (earnMethod) => earnMethod.title === earnSelected
    )

    return earnMethod?.items || []
  }

  return (
    <div className="flex w-full flex-col items-center bg-[#1e2030] text-white">
      <div className="w-full max-w-6xl">
        <div className="mt-6 flex items-center justify-between">
          <span className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-3xl tracking-tight text-transparent">
            DepiN DD
          </span>
          <button className="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500">
            Launch App
          </button>
        </div>

        <div className="mt-[40vh] mb-[40vh] flex flex-col items-center justify-center">
          <span className="text-8xl font-bold">DePIN DD</span>

          <span className="my-12 flex flex-col items-center text-lg font-semibold text-gray-400">
            All you need for Due Diligence on your next <b>DePin opportunity</b>
          </span>

          <div className="flex items-center">
            <button className="mr-3 rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500">
              Launch App
            </button>
            <button className="ml-3 rounded-full bg-gray-700 px-4 py-2 font-medium text-white hover:opacity-70">
              View Docs
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <span className="text-3xl font-medium">Earn with DePIN</span>

          <div className="flex w-full flex-col items-center">
            <div className="my-10 flex h-9 items-center justify-center overflow-hidden rounded-md">
              {EARN_METHODS.map((earnMethod) => (
                <span
                  className={clsx(
                    earnSelected === earnMethod.title
                      ? "rounded-md bg-sky-400 text-white first:rounded-r-md last:rounded-l-md"
                      : "bg-[#262A40] text-gray-300",
                    "flex h-full cursor-pointer items-center justify-center px-4 font-medium hover:opacity-80"
                  )}
                  key={earnMethod.title}
                >
                  {earnMethod.title}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {earnSelectedItems().map((item, index) => (
                <div
                  className="flex w-4/12 flex-col rounded-lg border border-[#41498e7e] bg-[#2D3153] p-4 shadow-md"
                  key={index}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3f4474] text-[#acb0d2]">
                    {index + 1}
                  </span>
                  <span className="my-2 text-lg">{item.title}</span>
                  <span className="text-sm font-medium text-gray-400">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-40 flex w-full flex-col items-center justify-center">
          <span className="text-3xl font-medium">Featured Projects</span>

          <div className="mt-10 flex w-full flex-wrap gap-4">
            {PROJECTS.map((item, index) => (
              <div
                className="flex w-[calc(33%-8px)] flex-col rounded-lg border border-[#41498e7e] bg-[#2D3153] p-4 shadow-md"
                key={index}
              >
                <span className="my-2 text-lg">{item.asset}</span>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-400">
                      APY
                    </span>
                    <span className="font-semibold text-gray-300">
                      {item.apy}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-400">
                      DAILY
                    </span>
                    <span className="font-semibold text-gray-300">
                      {item.daily}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

//
// Utils
//

const EARN_METHODS = [
  {
    title: "Mine",
    items: [
      {
        title: "Find Project",
        description:
          "Explore DePIN projects and find the best one available to you",
      },
      {
        title: "Purchase minor",
        description:
          "Compare miner options and make a purchase with your preferred decision",
      },
      {
        title: "Install miner",
        description:
          "Receive the miner and install it optimally based on user guides",
      },
      {
        title: "Earn rewards",
        description:
          "Get your return on investment by mining tokens with your miner",
      },
    ],
  },
  {
    title: "Host",
    items: [
      {
        title: "Find Project",
        description:
          "Explore DePIN projects and find the best one available to you",
      },
      {
        title: "Purchase minor",
        description:
          "Compare miner options and make a purchase with your preferred decision",
      },
      {
        title: "Install miner",
        description:
          "Receive the miner and install it optimally based on user guides",
      },
      {
        title: "Earn rewards",
        description:
          "Get your return on investment by mining tokens with your miner",
      },
    ],
  },
  {
    title: "Invest",
    items: [
      {
        title: "Find Project",
        description:
          "Explore DePIN projects and find the best one available to you",
      },
      {
        title: "Purchase minor",
        description:
          "Compare miner options and make a purchase with your preferred decision",
      },
      {
        title: "Install miner",
        description:
          "Receive the miner and install it optimally based on user guides",
      },
      {
        title: "Earn rewards",
        description:
          "Get your return on investment by mining tokens with your miner",
      },
    ],
  },
  {
    title: "Use",
    items: [
      {
        title: "Find Project",
        description:
          "Explore DePIN projects and find the best one available to you",
      },
      {
        title: "Purchase minor",
        description:
          "Compare miner options and make a purchase with your preferred decision",
      },
      {
        title: "Install miner",
        description:
          "Receive the miner and install it optimally based on user guides",
      },
      {
        title: "Earn rewards",
        description:
          "Get your return on investment by mining tokens with your miner",
      },
    ],
  },
]

const PROJECTS = [
  {
    asset: "Helium",
    apy: "2.48%",
    daily: "0.01%",
  },
  {
    asset: "DIMO",
    apy: "10.03%",
    daily: "0.03%",
  },
  {
    asset: "Hivemapper",
    apy: "11.75%",
    daily: "0.05%",
  },
  {
    asset: "XNET",
    apy: "3.69%",
    daily: "0.01%",
  },
  {
    asset: "React Network",
    apy: "14.34%",
    daily: "0.04%",
  },
  {
    asset: "WeatherXM",
    apy: "11.75%",
    daily: "0.03%",
  },
]
