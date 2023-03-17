import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import { Hero } from "./Hero"
import { Logo, Logomark } from "./Logo"
import { MobileNavigation } from "./MobileNavigation"
import { Navigation } from "./Navigation"
import { Prose } from "./Prose"
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from "./Table"
import { ThemeSelector } from "./ThemeSelector"

type NavigationType = {
  title: string
  links: { title: string; href: string }[]
}[]

const navigation: NavigationType = [
  {
    title: "About",
    links: [
      { title: "What is DePIN", href: "/" },
      { title: "What is DePIN DD", href: "/about/what-is-depindd" },
    ],
  },
  {
    title: "Leaderboards",
    links: [
      {
        title: "Miner payback time ",
        href: "/leaderboards/miner-payback-time",
      },
      { title: "Network size", href: "/leaderboards/network-size" },
    ],
  },
  {
    title: "Network categories",
    links: [
      {
        title: "Energy",
        href: "/categories/energy-networks",
      },
      { title: "Sensor", href: "/categories/sensor-networks" },
      { title: "Server", href: "/categories/server-networks" },
      {
        title: "Wireless",
        href: "/categories/wireless-networks",
      },
    ],
  },
  {
    title: "Miner networks",
    links: [
      { title: "DIMO", href: "/miner-networks/dimo" },
      { title: "Helium IOT", href: "/miner-networks/helium-iot" },
      { title: "Helium MOBILE", href: "/miner-networks/helium-mobile" },
      { title: "Hivemapper", href: "/miner-networks/hivemapper" },
      { title: "XNET", href: "/miner-networks/xnet" },
    ],
  },
]

function GitHubIcon(props: any) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

const Header: React.FC<{ navigation: NavigationType }> = ({ navigation }) => {
  let [isScrolled, setIsScrolled] = useState(false)

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
        <MobileNavigation navigation={navigation} />
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

const useTableOfContents = (tableOfContents) => {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

const getData = () => {
  const data = [
    {
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      status: "Active",
      role: "Admin",
      age: 27,
      imgUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Cody Fisher",
      email: "cody.fisher@example.com",
      title: "Product Directives Officer",
      department: "Intranet",
      status: "Inactive",
      role: "Owner",
      age: 43,
      imgUrl:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Esther Howard",
      email: "esther.howard@example.com",
      title: "Forward Response Developer",
      department: "Directives",
      status: "Active",
      role: "Member",
      age: 32,
      imgUrl:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Jenny Wilson",
      email: "jenny.wilson@example.com",
      title: "Central Security Manager",
      department: "Program",
      status: "Offline",
      role: "Member",
      age: 29,
      imgUrl:
        "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Kristin Watson",
      email: "kristin.watson@example.com",
      title: "Lean Implementation Liaison",
      department: "Mobility",
      status: "Inactive",
      role: "Admin",
      age: 36,
      imgUrl:
        "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Cameron Williamson",
      email: "cameron.williamson@example.com",
      title: "Internal Applications Engineer",
      department: "Security",
      status: "Active",
      role: "Member",
      age: 24,
      imgUrl:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
  ]
  return [...data, ...data, ...data]
}

export function Layout({ children, title, tableId, tableOfContents }) {
  let router = useRouter()
  let isHomePage = router.pathname === "/"
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)
  let containsDataTable = !!tableId

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter, // new
        filter: "includes",
      },
    ],
    []
  )

  const data = React.useMemo(() => getData(), [])

  return (
    <>
      <Header navigation={navigation} />

      {isHomePage && <Hero />}

      <div className="relative mx-auto flex max-w-8xl flex-wrap justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
            <Navigation
              navigation={navigation}
              className="w-64 pr-8 xl:w-72 xl:pr-16"
            />
          </div>
        </div>

        <div className="flex-1">
          {containsDataTable && (
            <div className="px-4 pt-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:pl-16 xl:pr-6">
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>

              <div className="mb-8 flex rounded-3xl bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10">
                <table className="w-full border-collapse text-sm shadow-sm">
                  <thead className="">
                    <tr>
                      <th
                        className="group border-b border-slate-300 px-4 py-3 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200"
                        aria-sort="ascending"
                      >
                        <span className="flex w-full items-center justify-between gap-2">
                          DePIN network
                        </span>
                      </th>
                      <th className="border-b border-slate-300 px-4 py-3 text-right font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                        Payback time
                      </th>
                      <th className="border-b border-slate-300 px-4 py-3 text-right font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                        Miner cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Helium IoT
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        13 months
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right tabular-nums text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        $200.00
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        DIMO
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        3 months
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right tabular-nums text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        $500.00
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                        Hivemapper
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500 dark:text-slate-400">
                        6 months
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-slate-500 dark:text-slate-400">
                        $600.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-8">
                <table className="w-full border-collapse border-y border-slate-400 text-sm shadow-sm dark:border-slate-500">
                  <thead className="">
                    <tr>
                      <th
                        className="group border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200"
                        aria-sort="ascending"
                      >
                        <span className="flex w-full items-center justify-between gap-2">
                          DePIN network
                        </span>
                      </th>
                      <th className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                        Payback time
                      </th>
                      <th className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                        Miner cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Helium IoT
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        13 months
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right tabular-nums text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        $200.00
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        DIMO
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        3 months
                      </td>
                      <td className="border border-l-0 border-r-0 border-slate-300 px-4 py-3 text-right tabular-nums text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        $500.00
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-300 px-4 py-3 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Hivemapper
                      </td>
                      <td className="border-b border-slate-300 px-4 py-3 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        6 months
                      </td>
                      <td className="border-b border-slate-300 px-4 py-3 text-right tabular-nums text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        $600.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <Table columns={columns} data={data} />
              </div>
            </div>
          )}

          <div className="flex">
            <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
              <article>
                {!containsDataTable && (title || section) && (
                  <header className="mb-9 space-y-1">
                    {section && (
                      <p className="font-display text-sm font-medium text-sky-500">
                        {section.title}
                      </p>
                    )}
                    {title && (
                      <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                        {title}
                      </h1>
                    )}
                  </header>
                )}
                <Prose>{children}</Prose>
              </article>
              <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
                {previousPage && (
                  <div>
                    <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                      Previous
                    </dt>
                    <dd className="mt-1">
                      <Link
                        href={previousPage.href}
                        className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                      >
                        <span aria-hidden="true">&larr;</span>{" "}
                        {previousPage.title}
                      </Link>
                    </dd>
                  </div>
                )}
                {nextPage && (
                  <div className="ml-auto text-right">
                    <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                      Next
                    </dt>
                    <dd className="mt-1">
                      <Link
                        href={nextPage.href}
                        className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                      >
                        {nextPage.title} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
              <nav aria-labelledby="on-this-page-title" className="w-56">
                {tableOfContents.length > 0 && (
                  <>
                    <h2
                      id="on-this-page-title"
                      className="font-display text-sm font-medium text-slate-900 dark:text-white"
                    >
                      On this page
                    </h2>
                    <ol role="list" className="mt-4 space-y-3 text-sm">
                      {tableOfContents.map((section) => (
                        <li key={section.id}>
                          <h3>
                            <Link
                              href={`#${section.id}`}
                              className={clsx(
                                isActive(section)
                                  ? "text-sky-500"
                                  : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                              )}
                            >
                              {section.title}
                            </Link>
                          </h3>
                          {section.children.length > 0 && (
                            <ol
                              role="list"
                              className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                            >
                              {section.children.map((subSection) => (
                                <li key={subSection.id}>
                                  <Link
                                    href={`#${subSection.id}`}
                                    className={
                                      isActive(subSection)
                                        ? "text-sky-500"
                                        : "hover:text-slate-600 dark:hover:text-slate-300"
                                    }
                                  >
                                    {subSection.title}
                                  </Link>
                                </li>
                              ))}
                            </ol>
                          )}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
