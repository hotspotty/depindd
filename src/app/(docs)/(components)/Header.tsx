"use client"

import GitHubIcon from "@/components/icons/GithubIcon"
import { Logo, Logomark } from "@/components/Logo"
import { MobileNavigation } from "@/components/MobileNavigation"
import { ThemeSelector } from "@/components/ThemeSelector"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"
import { SidebarSection } from "../(utils)/sidebar"

export default function Header({
  sidebarItems,
}: {
  sidebarItems: SidebarSection
}) {
  let [isScrolled, setIsScrolled] = useState(false)

  // TODO: see how to only do this in the client size but render the rest in the server side
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8",
        isScrolled
          ? "dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75"
          : "dark:bg-transparent"
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation sidebarItems={sidebarItems} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          <Logomark className="h-9 w-9 lg:hidden" />
          <Logo className="hidden h-9 w-auto fill-slate-700 dark:fill-sky-100 lg:block" />
        </Link>
      </div>

      <div className="relative flex basis-0 justify-end md:flex-grow">
        <nav className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
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
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </Link>
        </div>
      </div>
    </header>
  )
}
