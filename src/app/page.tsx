import { projects } from "@/app/(docs)/(data)/projects"
import blurCyanImage from "@/images/blur-cyan.png"
import blurIndigoImage from "@/images/blur-indigo.png"
import Image from "next/image"
import { HeroButton } from "./(docs)/(components)/HeroButton"
import { Icon } from "./(docs)/(components)/Icon"
import { Search } from "./(docs)/(components)/Search"
import Tab from "./(docs)/(components)/Tab"
import { QuickLink } from "./(docs)/(components)/markdoc/QuickLinks"

export const metadata = {
  title: "DePIN DD",
}

const Home: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden text-white">
      <div className="w-full max-w-6xl px-4 sm:px-0">
        <div className="relative w-full">
          <Image
            className="absolute -right-64 -top-64"
            src={blurCyanImage}
            alt="Background cyan blur image"
            width={530}
            height={530}
            unoptimized
            priority
          />
          <Image
            className="absolute -bottom-40 -right-44"
            src={blurIndigoImage}
            alt="Background indigo blur image"
            width={567}
            unoptimized
            priority
          />
        </div>
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <Image
            className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
            src={blurCyanImage}
            alt=""
            width={530}
            height={530}
            unoptimized
            priority
          />
          <div className="flex items-center gap-4">
            <Icon icon="logo" className="h-24 w-24" />

            <p className="bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl font-extrabold tracking-tight text-slate-900 text-transparent sm:text-8xl">
              DePIN DD
            </p>
          </div>

          <span className="mx-auto mt-6 max-w-3xl text-center text-slate-600 dark:text-slate-300 sm:text-lg">
            All you need for <b>Due Diligence</b> on your next{" "}
            <b>DePIN opportunity</b>
          </span>

          <div className="mt-6 flex items-center gap-4 sm:mt-10 md:justify-center lg:justify-start">
            <HeroButton
              className="flex items-center justify-center"
              href="/about/depin"
            >
              Get started
            </HeroButton>
            <Search />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="relative w-full">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
          </div>
          <span className="text-3xl font-medium">Earn with DePIN</span>

          <Tab
            list={["Mine", "Host", "Invest", "Use"]}
            panels={Object.values(TAB_CONTENT).map((content, contentIndex) => (
              <div
                className="flex flex-col gap-4 sm:flex-row"
                key={contentIndex}
              >
                {content.map(({ title, description }, index) => (
                  <div
                    className="flex w-full flex-col rounded-xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-800 md:w-4/12"
                    key={index}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-slate-200">
                      {index + 1}
                    </span>
                    <span className="my-2 text-lg">{title}</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {description}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          ></Tab>
        </div>

        <div className="my-40 flex w-full flex-col items-center justify-center">
          <div className="relative w-full">
            <Image
              className="absolute -right-64 -top-64"
              src={blurCyanImage}
              alt="Background cyan blur image"
              width={530}
              height={530}
              unoptimized
              priority
            />
            <Image
              className="absolute -bottom-40 -right-44"
              src={blurIndigoImage}
              alt="Background indigo blur image"
              width={567}
              unoptimized
              priority
            />
          </div>
          <span className="text-3xl font-medium">Featured Projects</span>

          <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {projects
              .slice(0, 6)
              .map(({ slug, title, lego, categories, logo }) => (
                <QuickLink
                  key={slug}
                  title={title}
                  labels={[lego, ...categories]}
                  image={logo}
                  href={`/projects/${slug}`}
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

const TAB_CONTENT = {
  mine: [
    {
      title: "Analyse projects",
      description:
        "Explore DePIN projects and make an informed investment decision",
    },
    {
      title: "Purchase miner",
      description:
        "Compare miner options and make an optimal purchase decision",
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
  host: [
    {
      title: "Apply as host",
      description: "Explore DePIN projects and apply for a host position",
    },
    {
      title: "Get miner assigned",
      description: "Enter the form to apply for a host position",
    },
    {
      title: "Install miner",
      description: "DePIN operator delivers and installs the miner",
    },
    {
      title: "Earn rewards",
      description: "Unlock passive income by mining tokens by hosting a miner",
    },
  ],
  invest: [
    {
      title: "Explore projects",
      description: "Explore DePIN projects based on your investor profile",
    },
    {
      title: "Analyse leaderboards",
      description: "Compare projects using data based on curated metrics",
    },
    {
      title: "Buy tokens",
      description: "Get early token exposure to promising projects",
    },
    {
      title: "Earn rewards",
      description: "Monitor your DePIN investment portfolio",
    },
  ],
  use: [
    {
      title: "Explore projects",
      description: "Explore DePIN projects in your field of interest",
    },
    {
      title: "Read case studies",
      description:
        "Read success stories of DePIN networks with product market fit",
    },
    {
      title: "Evaluate opportunity",
      description:
        "Find relevant DePIN network coverage using the map explorer",
    },
    {
      title: "Use and benefit",
      description:
        "Benefit from better unit economics achieved by DePIN networks",
    },
  ],
}
