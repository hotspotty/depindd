import { projects } from "@/app/(docs)/(data)/projects"
import blurCyanImage from "@/images/blur-cyan.png"
import blurIndigoImage from "@/images/blur-indigo.png"
import clsx from "clsx"
import Image from "next/image"
import { HeroButton } from "./(docs)/(components)/HeroButton"
import { Icon } from "./(docs)/(components)/Icon"
import { QuickLink } from "./(docs)/(components)/markdoc/QuickLinks"
import { Search } from "./(docs)/(components)/Search"

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
        <div className="mt-[45vh] mb-[40vh] flex flex-col items-center justify-center">
          <Image
            className="absolute bottom-full right-full -mr-72 -mb-56 opacity-50"
            src={blurCyanImage}
            alt=""
            width={530}
            height={530}
            unoptimized
            priority
          />
          <div className="flex items-center gap-4">
            <Icon icon="logo" className="h-24 w-24" />

            <p className="bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-8xl font-extrabold tracking-tight text-slate-900 text-transparent">
              DePIN DD
            </p>
          </div>

          <span className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-300">
            All you need for <b>Due Diligence</b> on your next{" "}
            <b>DePIN opportunity</b>
          </span>

          <div className="mt-6 flex gap-4 sm:mt-10 md:justify-center lg:justify-start">
            <HeroButton href="/about/depin">Get started</HeroButton>
            <Search />
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
                      ? "rounded-md bg-sky-300 font-semibold text-slate-900 first:rounded-r-md last:rounded-l-md hover:bg-sky-200"
                      : "bg-slate-800 font-medium text-white hover:bg-slate-700",
                    "z-10 flex h-full cursor-pointer items-center justify-center px-4 text-sm"
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
                  className="flex w-4/12 flex-col rounded-xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-800"
                  key={index}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-slate-200">
                    {index + 1}
                  </span>
                  <span className="my-2 text-lg">{item.title}</span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
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

          <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {projects.slice(0, 6).map((project) => (
              <QuickLink
                key={project.slug}
                title={project.title}
                labels={[project.lego, ...project.categories]}
                image={project.logo}
                href={`/projects/${project.slug}`}
              />
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
