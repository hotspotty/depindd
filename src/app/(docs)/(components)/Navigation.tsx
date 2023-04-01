"use client"

import { SidebarSection } from "@/app/(docs)/(utils)/sidebar"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation({
  sidebar,
  className,
}: {
  sidebar: SidebarSection[]
  className?: string
}) {
  const pathname = usePathname() // TODO: make it work in server side

  return (
    <nav className={clsx("text-base lg:text-sm", className)}>
      <ul role="list" className="space-y-9">
        {sidebar.map(({ section, label, showCount, items }) => (
          <li key={section}>
            <div className="flex items-center">
              <h2 className="font-display font-medium text-slate-900 dark:text-white">
                {label}
              </h2>
              {showCount && (
                <span className="ml-2 font-normal text-slate-700 dark:text-slate-200">
                  ({items.length})
                </span>
              )}
            </div>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
            >
              {items.map((page) => (
                <li key={page.slug} className="relative">
                  <Link
                    href={`/${section}/${page.slug}`}
                    className={clsx(
                      "block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full",
                      `/${section}/${page.slug}` === pathname
                        ? "font-semibold text-sky-500 before:bg-sky-500"
                        : "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                    )}
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
