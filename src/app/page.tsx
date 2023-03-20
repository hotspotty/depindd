import blurCyanImage from "@/images/blur-cyan.png"
import blurIndigoImage from "@/images/blur-indigo.png"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { HeroButton } from "./(docs)/(components)/HeroButton"
import GitHubIcon from "./(docs)/(components)/icons/GithubIcon"
import { ThemeSelector } from "./(docs)/(components)/ThemeSelector"

export const metadata = {
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
    <div className="flex w-full flex-col items-center text-white">
      <header className="flex w-full flex-wrap items-center bg-white px-4 py-5 dark:bg-transparent dark:shadow-none sm:px-6 lg:px-8">
        <div className="relative flex basis-0 justify-end md:flex-grow">
          <nav className="z-10 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
            <ul className="flex space-x-8">
              <li>
                <a
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                  href="/leaderboards/miner-payback-time"
                >
                  Networks
                </a>
              </li>
              <li>
                <a
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                  href="/showcase"
                >
                  Showcase
                </a>
              </li>
              <li>
                <a
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                  href="/blog"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          <div className="ml-6 flex items-center gap-6 border-l border-slate-200 pl-6 dark:border-slate-800 sm:gap-8">
            <ThemeSelector className="relative z-10" />
            <Link
              href="https://github.com/hotspotty/depindd"
              className="group"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-5 w-5 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
            </Link>
          </div>
        </div>
      </header>
      <div className="w-full max-w-6xl">
        <div className="relative w-full">
          <Image
            className="absolute -top-64 -right-64"
            src={blurCyanImage}
            alt=""
            width={530}
            height={530}
            unoptimized
            priority
          />
          <Image
            className="absolute -bottom-40 -right-44"
            src={blurIndigoImage}
            alt=""
            width={567}
            height={567}
            unoptimized
            priority
          />
        </div>
        <div className="mt-[30vh] mb-[40vh] flex flex-col items-center justify-center">
          <Image
            className="absolute bottom-full right-full -mr-72 -mb-56 opacity-50"
            src={blurCyanImage}
            alt=""
            width={530}
            height={530}
            unoptimized
            priority
          />
          <p className="bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-8xl font-extrabold tracking-tight text-slate-900 text-transparent">
            DePIN DD
          </p>

          <span className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
            All you need for Due Diligence on your next <b>DePIN opportunity</b>
          </span>

          <div className="mt-6 flex gap-4 sm:mt-10 md:justify-center lg:justify-start">
            <HeroButton href="/leaderboards/miner-payback-time">
              Get started
            </HeroButton>
            <HeroButton href="/about/what-is-depindd" variant="secondary">
              Learn more
            </HeroButton>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="relative w-full">
            <Image
              className="absolute bottom-full right-full -mr-72 -mb-56 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
          </div>
          <span className="text-3xl font-medium">Earn with DePIN</span>

          <div className="flex w-full flex-col items-center">
            <div className="my-10 flex h-9 items-center justify-center overflow-hidden rounded-md">
              {EARN_METHODS.map((earnMethod) => (
                <span
                  className={clsx(
                    earnSelected === earnMethod.title
                      ? "rounded-md bg-sky-400 text-white first:rounded-r-md last:rounded-l-md"
                      : "bg-[#262A40] text-gray-300",
                    "z-10 flex h-full cursor-pointer items-center justify-center px-4 font-medium hover:opacity-80"
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
          <div className="relative w-full">
            <Image
              className="absolute -top-64 -right-64"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <Image
              className="absolute -bottom-40 -right-44"
              src={blurIndigoImage}
              alt=""
              width={567}
              height={567}
              unoptimized
              priority
            />
          </div>
          <span className="text-3xl font-medium">Featured Projects</span>

          <div className="mt-10 flex w-full flex-wrap gap-4">
            {PROJECTS.map((item, index) => (
              <div
                className="z-10 flex w-[calc(33%-8px)] flex-col rounded-lg border border-[#41498e7e] bg-[#2D3153] p-4 shadow-md"
                key={index}
              >
                <span className="my-2 mb-4 text-lg font-bold">
                  {item.asset}
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="mb-1 text-sm font-semibold text-gray-400">
                      APY
                    </span>
                    <span className="font-bold text-gray-300">{item.apy}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="mb-1 text-sm font-semibold text-gray-400">
                      DAILY
                    </span>
                    <span className="font-bold text-gray-300">
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
        title: "Purchase miner",
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
        title: "Purchase miner",
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
        title: "Purchase miner",
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
        title: "Purchase miner",
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
