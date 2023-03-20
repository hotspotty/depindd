"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { use, useCallback, useEffect, useState } from "react"

const isActive = (section: any, currentSection: string) => {
  if (section.id === currentSection) {
    return true
  }

  if (!section.children) {
    return false
  }

  return section.children.findIndex((item) => item.id === currentSection) > -1
}

export default function TableOfContents({
  tableOfContents,
}: {
  tableOfContents: any[]
}) {
  const pathname = usePathname()
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

  const goToSection = useCallback((id: string) => {
    let el = document.getElementById(id)
    if (!el) return

    let style = window.getComputedStyle(el)
    let scrollMt = parseFloat(style.scrollMarginTop)

    let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
    window.scrollTo({ top, behavior: "smooth" })
  }, [])

  return (
    <nav className="w-56">
      {tableOfContents.length > 0 && (
        <ol role="list" className="space-y-3 text-sm">
          {tableOfContents.map((section) => (
            <li key={section.id}>
              <h3>
                <Link
                  onClick={() => goToSection(section.id)}
                  href={`${pathname}#${section.id}`}
                  className={clsx(
                    isActive(section, currentSection)
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
                        onClick={() => goToSection(subSection.id)}
                        href={`${pathname}#${subSection.id}`}
                        className={
                          isActive(subSection, currentSection)
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
      )}
    </nav>
  )
}
