import blurCyanImage from "@/images/blur-cyan.png"
import blurIndigoImage from "@/images/blur-indigo.png"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"
import { HeroBackground } from "./HeroBackground"
import { HeroButton } from "./HeroButton"
import { Icon } from "./Icon"
import Tab from "./Tab"

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mr-72 -mb-56 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <div className="flex items-center gap-4">
                <Icon icon="logo" className="h-14 w-14" />
                <div className="flex-1">
                  <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-5xl font-extrabold tracking-tight text-slate-900 text-transparent">
                    DePIN DD
                  </p>
                  <Link href="https://hotspotty.net" target="_blank">
                    <span className="ml-2 bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-sm tracking-tight text-slate-900 text-transparent">
                      by Hotspotty
                    </span>
                  </Link>
                </div>
              </div>

              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
                Everything you need for <b>Due Diligence</b> on <b>DePIN</b>
              </p>
              <div className="mt-6 flex gap-4 sm:mt-10 md:justify-center lg:justify-start">
                <HeroButton href="/leaderboards/miner-payback-time">
                  Get started
                </HeroButton>
                <HeroButton href="/about/depindd" variant="secondary">
                  Learn more
                </HeroButton>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:left-[calc(50%+14rem)] lg:right-0 lg:-top-32 lg:-bottom-32 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                <div className="pl-4 pt-4">
                  <h3 className="font-display text-2xl tracking-tight text-slate-900 dark:text-white">
                    TOP 3
                  </h3>

                  <Tab
                    listContentClsx="my-0 gap-2 items-center justify-start w-full"
                    tabClsx={{
                      active:
                        "rounded-full bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px text-sky-300",
                      inactive: "text-slate-400 rounded-full p-px",
                      textActive:
                        "bg-slate-800 rounded-full px-2 py-0.5 text-xs",
                      textInactive: "px-2 py-0.5 text-xs",
                    }}
                    list={tabs}
                    panels={Object.values(panels).map((item, index) => (
                      <div
                        className="mt-6 flex w-full items-start px-1 text-sm"
                        key={index}
                      >
                        <div
                          aria-hidden="true"
                          className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-300"
                        >
                          {Array.from({
                            length: item.length,
                          }).map((_, index) => (
                            <Fragment key={index}>
                              {index + 1}
                              <br />
                            </Fragment>
                          ))}
                        </div>
                        <pre className="flex overflow-x-auto pb-6">
                          <code className="px-4 text-slate-300">
                            {item.map((project) => (
                              <div key={project}>{project}</div>
                            ))}
                          </code>
                        </pre>
                      </div>
                    ))}
                  ></Tab>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//
// Utils
//

const tabs = [
  "Miner payback time",
  "Governance score",
  "Tokenomics score",
  "Ease of mining score",
]

const panels = {
  "Miner payback time": [
    "DIMO: x months",
    "Hivemapper: y months",
    "Helium 5G: z months",
  ],
  "Governance score": [
    "Hivemapper: y months",
    "DIMO: x mont",
    "Helium 5G: z months",
  ],
  "Tokenomics score": ["hs", "Hivemapper: y months", "Helium 5G: z months"],
  "Ease of mining score": [
    "Xnet",
    "Hivemapper: y months",
    "Helium 5G: z months",
  ],
}
