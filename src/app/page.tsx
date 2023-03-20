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
    <div className="flex w-full flex-col items-center text-white bg-[#1e2030]">
      <div className="w-full max-w-6xl">
        <div className="mt-6 flex items-center justify-between">
          <span className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-3xl tracking-tight text-transparent">
            DepiN DD
          </span>
          <button className="rounded-md bg-sky-400 px-4 py-2 text-sm font-medium text-white hover:opacity-70">
            Launch App
          </button>
        </div>

        <div className="mt-[30vh] mb-[10vh] flex flex-col items-center justify-center">
          <span className="text-8xl font-bold">DePIN DD</span>

          <span className="my-12 flex flex-col items-center text-lg font-semibold text-gray-400">
            All you need for Due Diligence on your next <b>DePin opportunity</b>
          </span>

          <div className="flex items-center">
            <button className="mr-3 rounded-md bg-sky-400 px-6 py-3 font-medium text-white hover:opacity-70">
              Launch App
            </button>
            <button className="ml-3 rounded-md bg-gray-700 px-6 py-3 font-medium text-white hover:opacity-70">
              View Docs
            </button>
          </div>
        </div>

        <div className="flex min-h-screen w-full flex-col items-center justify-center">
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
