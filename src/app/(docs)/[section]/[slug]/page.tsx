import TableOfContents from "@/app/(docs)/(components)/TableOfContents"
import { Prose } from "@/app/(docs)/(components)/markdoc/Prose"
import {
  collectHeadings,
  getMarkdownContent,
} from "@/app/(docs)/(utils)/markdown"
import { components } from "@/app/(docs)/config.markdoc"
import Markdoc from "@markdoc/markdoc"
import slugify from "@sindresorhus/slugify"
import { glob } from "glob"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import path from "path"
import React from "react"
import Labels, { Label } from "../../(components)/Labels"
import Links from "../../(components)/Links"
import { blockchains } from "../../(data)/blockchains"
import { legoCategories } from "../../(data)/lego"
import { projects } from "../../(data)/projects"
import { PAGES_PATH, getSidebarItems } from "../../(utils)/sidebar"
import { capitalizeFirstLetter } from "../../(utils)/text"

type Params = {
  section: string
  slug: string
}

type PageProps = {
  params: Params
}

export const dynamicParams = false

const ARTICLES_DIR = path.join(process.cwd(), PAGES_PATH)

export async function generateStaticParams() {
  const docPaths = await glob(path.join(ARTICLES_DIR, "**/*.md"))
  return docPaths.map((docPath) => {
    const section = path
      .dirname(docPath.replace(ARTICLES_DIR, ""))
      .replace("/", "")
    const slug = path.basename(docPath, path.extname(docPath))
    return { section, slug }
  })
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const projectInfo = projects.find(({ slug }) => slug === params.slug)
  const filePath = path.join(PAGES_PATH, params.section, params.slug + ".md")
  const { title } = getMarkdownContent(filePath)
  return {
    title:
      params.section.replaceAll("-", " ") + " - " + title || projectInfo?.title,
  }
}

export default function Page({ params }: PageProps) {
  const sidebar = getSidebarItems()
  const section = sidebar.find(({ section }) => section === params.section)
  const filePath = path.join(PAGES_PATH, params.section, params.slug + ".md")
  let { title, content, topContent } = getMarkdownContent(filePath)

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
          url: blockchainInfo.links.find(({ type }) => type === "website")?.url,
          target: "_blank",
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

  const tableOfContents = collectHeadings(content)
  const allPages = sidebar.flatMap((section) => section.items)
  const pageIndex = allPages.findIndex(({ slug }) => slug === params.slug)
  const previousPage = allPages[pageIndex - 1]
  const nextPage = allPages[pageIndex + 1]

  const renderFooter = (
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
  )

  const renderTableOfContents = (
    <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
      <TableOfContents tableOfContents={tableOfContents} />
    </div>
  )

  if (topContent) {
    return (
      <div className="flex-1">
        <div className="px-4 py-16 lg:pl-8 lg:pr-0 xl:px-16">
          <header className="mb-9 space-y-1">
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
          <Prose>
            {Markdoc.renderers.react(topContent, React, {
              components,
            })}
            <hr />
          </Prose>
        </div>
        <div className="flex">
          <div className="min-w-0 max-w-2xl flex-auto px-4 pb-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
            <article>
              <Prose>
                {Markdoc.renderers.react(content, React, { components })}
              </Prose>
            </article>
            {renderFooter}
          </div>
          {renderTableOfContents}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="flex">
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
          <article>
            <header className="mb-9 space-y-1">
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
            <Prose>
              {Markdoc.renderers.react(content, React, { components })}
            </Prose>
          </article>
          {renderFooter}
        </div>
        {renderTableOfContents}
      </div>
    </div>
  )
}
