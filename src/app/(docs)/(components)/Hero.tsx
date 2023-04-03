import sidebarConfig from "@/app/(docs)/config.sidebar.json"
import blurCyanImage from "@/images/blur-cyan.png"
import blurIndigoImage from "@/images/blur-indigo.png"
import Markdoc, { RenderableTreeNodes } from "@markdoc/markdoc"
import fs from "fs"
import matter from "gray-matter"
import Image from "next/image"
import Link from "next/link"
import path from "path"
import React from "react"
import getMarkdownContentFromText from "../(utils)/getMarkdownContentFromText"
import { PAGES_PATH } from "../(utils)/sidebar"
import { slugToTitle } from "../(utils)/text"
import { components } from "../config.markdoc"
import { HeroBackground } from "./HeroBackground"
import { HeroButton } from "./HeroButton"
import { Icon } from "./Icon"
import Tab from "./Tab"
import { Prose } from "./markdoc/Prose"

export function Hero() {
  const leaderboardKeys =
    sidebarConfig.find(({ section }) => section === "leaderboards")!.slugs || []
  const leaderboards = leaderboardKeys
    .map((slug) => {
      const filePath = path.join(PAGES_PATH, "leaderboards", slug + ".md")
      const source = fs.readFileSync(filePath, "utf-8")
      const {
        data: { topContentTag },
      } = matter(source)
      const topContent = topContentTag
        ? getMarkdownContentFromText(`{% ${topContentTag} minimal="true" / %}`)
        : undefined
      return {
        slug,
        title: slugToTitle(slug),
        topContent,
      }
    })
    .filter(({ topContent }) => topContent)

  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
              src={blurCyanImage}
              alt="Background cyan blur image"
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
                alt="Background cyan blur image"
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
                unoptimized
                priority
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                <div className="px-4 pt-4">
                  <Tab
                    title="Leaderboards"
                    listContentClsx="!my-0 gap-2 items-center justify-start w-full"
                    tabClsx={{
                      active:
                        "rounded-full bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px text-sky-300",
                      inactive: "text-slate-400 rounded-full p-px",
                      textActive:
                        "bg-slate-800 rounded-full px-2 py-0.5 text-xs",
                      textInactive: "px-2 py-0.5 text-xs",
                    }}
                    list={leaderboards.map(({ title }) => title)}
                    panels={leaderboards.map(({ topContent }, index) => (
                      <div className="-my-6 w-full" key={index}>
                        <Prose>
                          {Markdoc.renderers.react(
                            topContent as RenderableTreeNodes,
                            React,
                            {
                              components,
                            }
                          )}
                        </Prose>
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
