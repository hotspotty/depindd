"use client"

import GitHubIcon from "@/app/(docs)/(components)/icons/GithubIcon"
import { MobileNavigation } from "@/app/(docs)/(components)/MobileNavigation"
import { ThemeSelector } from "@/app/(docs)/(components)/ThemeSelector"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"
import { SidebarSection } from "../(utils)/sidebar"
import { Icon } from "./Icon"
import { Search } from "./Search"

export default function Header({ sidebar }: { sidebar: SidebarSection[] }) {
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
        "sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-3 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8",
        isScrolled
          ? "dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75"
          : "dark:bg-transparent"
      )}
    >
      <div className="flex lg:mr-6 lg:hidden">
        <MobileNavigation sidebar={sidebar} />
      </div>

      <div className="relative flex flex-grow basis-0 justify-center lg:justify-start">
        <a
          href="/"
          onClick={() => {
            window.location.href = "/"
          }}
          className="flex items-center gap-3"
        >
          <Icon
            icon="logo"
            className={clsx(
              isScrolled ? "opacity-100" : "opacity-0",
              "h-8 w-8 text-transparent transition-opacity duration-500 ease-in"
            )}
          />

          <p
            className={clsx(
              isScrolled ? "opacity-100" : "opacity-0",
              "bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-2xl font-extrabold tracking-tight text-slate-900 text-transparent transition-opacity duration-500 ease-in"
            )}
          >
            DePIN DD
          </p>
          <div
            className={clsx(
              isScrolled ? "opacity-100" : "opacity-0",
              "-mb-2 inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-mono text-xs font-light tracking-tight text-slate-900 text-transparent transition-opacity duration-500 ease-in"
            )}
          >
            by Hotspotty
          </div>
        </a>
      </div>

      <div className="-my-5 mr-4 sm:mr-8 md:mr-0">
        <Search />
      </div>

      <div className="relative hidden basis-0 justify-end md:flex-grow lg:flex">
        <nav className="mr-6 hidden border-r border-slate-200 pr-6 text-sm font-semibold leading-6 text-slate-700 dark:border-slate-800 dark:text-slate-200 lg:hidden">
          <ul className="flex space-x-8">
            <li>
              <Link
                className="hover:text-sky-500 dark:hover:text-sky-400"
                href="/leaderboards/miner-profitability"
              >
                Networks
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-sky-500 dark:hover:text-sky-400"
                href="/showcase"
              >
                Showcase
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-sky-500 dark:hover:text-sky-400"
                href="/blog"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-6 sm:gap-4">
          <ThemeSelector />
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
  )
}
