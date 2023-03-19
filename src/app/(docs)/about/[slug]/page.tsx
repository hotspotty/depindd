import TableOfContents from "@/app/(docs)/(components)/TableOfContents"
import {
  collectHeadings,
  getMarkdownContent,
} from "@/app/(docs)/(utils)/markdown"
import { navigation } from "@/app/(docs)/(utils)/navigation"
import { components } from "@/app/(docs)/config.markdoc"
import { Prose } from "@/components/Prose"
import Markdoc from "@markdoc/markdoc"
import { glob } from "glob"
import { Metadata } from "next"
import Link from "next/link"
import path from "path"
import { title } from "process"
import React from "react"

const ARTICLES_PATH = "src/app/(docs)/(articles)" // TODO: make it dynamic
const POSTS_DIR = path.join(process.cwd(), ARTICLES_PATH)

type Params = {
  slug: string
}

type PageProps = {
  params: Params
}

export const dynamicParams = false

export async function generateStaticParams() {
  const docPaths = await glob(path.join(POSTS_DIR, "**/*.md"))
  console.log(docPaths)
  return docPaths.map((docPath) => {
    return { slug: path.basename(docPath, path.extname(docPath)) }
  })
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { title } = await getMarkdownContent(POSTS_DIR, params.slug)
  return { title }
}

export default async function Page({ params }: PageProps) {
  const { content } = await getMarkdownContent(POSTS_DIR, params.slug)
  const tableOfContents = collectHeadings(content)

  // TODO: fix
  const pathname = path.join(POSTS_DIR, params.slug) // usePathname()
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === pathname)
  )

  return (
    <div className="flex-1">
      <div className="flex">
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
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
            <Prose>
              {Markdoc.renderers.react(content, React, { components })}
            </Prose>
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
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
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
          <TableOfContents tableOfContents={tableOfContents} />
        </div>
      </div>
    </div>
  )
}
