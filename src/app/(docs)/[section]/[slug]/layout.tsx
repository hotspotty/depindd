import { getMarkdownTitle } from "@/app/(docs)/(utils)/markdown"
import slugify from "@sindresorhus/slugify"
import { glob } from "glob"
import Image from "next/image"
import Link from "next/link"
import path from "path"
import React from "react"
import Labels, { Label } from "../../(components)/Labels"
import Links from "../../(components)/Links"
import { blockchains } from "../../(data)/blockchains"
import { projects } from "../../(data)/projects"
import { legoCategories } from "../../(data)/types"
import { PAGES_PATH, getSidebarItems } from "../../(utils)/sidebar"
import { capitalizeFirstLetter } from "../../(utils)/text"

type PageProps = {
  params: {
    section: string
    slug: string
  }
  children: React.ReactNode
}

export const dynamicParams = false

export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), PAGES_PATH)
  const docPaths = await glob(path.join(pagesDir, "**/*.md"))
  return docPaths.map((docPath) => {
    const section = path.dirname(docPath.replace(pagesDir, "")).replace("/", "")
    const slug = path.basename(docPath, path.extname(docPath))
    return { section, slug }
  })
}

export default async function PageLayout({ params, children }: PageProps) {
  const filePath = path.join(PAGES_PATH, params.section, params.slug + ".md")
  let title = getMarkdownTitle(filePath)

  let logo: string | undefined = undefined
  let labels: Label[] = []
  let links: { title: string; url: string }[] = []

  if (params.section === "projects") {
    const projectInfo = projects.find(({ slug }) => slug === params.slug)
    if (projectInfo) {
      title = projectInfo.title
      logo = projectInfo.logo

      labels = [
        {
          title: capitalizeFirstLetter(projectInfo.lego),
          url: `/lego/${projectInfo.lego}`,
        },
        ...projectInfo.categories.map((category) => ({
          title: capitalizeFirstLetter(category),
          url: `/lego/${projectInfo.lego}#${slugify(category)}`,
        })),
      ]

      const blockchainInfo = blockchains.find(
        ({ slug }) => slug === projectInfo.blockchain
      )
      if (blockchainInfo) {
        labels.push({
          title: blockchainInfo.title,
          url: `/blockchains/${blockchainInfo.slug}`,
        })
      }

      projectInfo.links.forEach(({ type, label, url }) => {
        if (!url) return
        let title = capitalizeFirstLetter(type)
        if (label) title += ` - ${label}`
        links.push({ title, url })
      })
    }
  } else if (params.section === "blockchains") {
    const blockchainInfo = blockchains.find(({ slug }) => slug === params.slug)
    if (blockchainInfo) {
      title = blockchainInfo.title
      logo = blockchainInfo.logo

      blockchainInfo.links.forEach(({ type, label, url }) => {
        if (!url) return
        let title = capitalizeFirstLetter(type)
        if (label) title += ` - ${label}`
        links.push({ title, url })
      })
    }
  } else if (params.section === "lego") {
    labels = legoCategories[params.slug].map((category) => ({
      title: capitalizeFirstLetter(category),
      url: `/lego/${params.slug}#${slugify(category)}`,
      samePage: true,
    }))
  }

  if (!title) title = capitalizeFirstLetter(params.slug)

  const sidebar = await getSidebarItems()
  const section = sidebar.find(({ section }) => section === params.section)
  const allPages = sidebar.flatMap(({ items }) => items)
  const pageIndex = allPages.findIndex(({ slug }) => slug === params.slug)
  const previousPage = allPages[pageIndex - 1]
  const nextPage = allPages[pageIndex + 1]

  return (
    <div className="w-full">
      <header className="mb-9 space-y-1 px-4 pt-16 lg:pl-8 lg:pr-0 xl:px-16">
        <div className="flex items-center gap-x-6">
          {logo && (
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md shadow-slate-800/5 ring-1 ring-slate-900/5 dark:border dark:border-slate-700/50 dark:bg-slate-700 dark:ring-0">
              <Image
                className="h-16 w-16 rounded-full"
                width={64}
                height={64}
                src={logo}
                alt={title}
              />
            </div>
          )}
          <div>
            <p className="font-display text-sm font-medium text-sky-500">
              {section?.label}
            </p>
            <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            <Labels labels={labels} />
          </div>
        </div>
        <Links className="!mt-6" links={links} />
      </header>

      {children}

      <div className="min-w-0 max-w-2xl flex-auto px-4 pb-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
          {previousPage && (
            <div>
              <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                Previous
              </dt>
              <dd className="mt-1">
                <Link
                  href={previousPage.path}
                  className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  <span aria-hidden="true">&larr;</span> {previousPage.label}
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
                  href={nextPage.path}
                  className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  {nextPage.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
