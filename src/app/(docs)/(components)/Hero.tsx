import blurCyanImage from "@/images/blur-cyan.png"
import blurIndigoImage from "@/images/blur-indigo.png"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"
import { HeroBackground } from "./HeroBackground"
import { HeroButton } from "./HeroButton"
import { Icon } from "./Icon"

const tabs = [
  { name: "Miner profitability", isActive: true },
  { name: "Governance score", isActive: false },
  { name: "Tokenomics score", isActive: false },
  { name: "Ease of mining score", isActive: false },
]

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
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
                <HeroButton href="/leaderboards/miner-profitability">
                  Get started
                </HeroButton>
                <HeroButton href="/about/depindd" variant="secondary">
                  Learn more
                </HeroButton>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <Image
                className="absolute -right-64 -top-64"
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
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx(
                          "flex h-6 rounded-full",
                          tab.isActive
                            ? "bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300"
                            : "text-slate-500"
                        )}
                      >
                        <div
                          className={clsx(
                            "flex items-center rounded-full px-2.5",
                            tab.isActive && "bg-slate-800"
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm">
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-300"
                    >
                      {Array.from({
                        length: 3,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {index + 1}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <pre className="flex overflow-x-auto pb-6">
                      <code className="px-4 text-slate-300">
                        <div>DIMO: x months</div>
                        <div>Hivemapper: y months</div>
                        <div>Helium 5G: z months</div>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
