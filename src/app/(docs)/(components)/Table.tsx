"use client"

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import Tooltip from "rc-tooltip"
import React, { ReactNode } from "react"
import {
  Column,
  TableInstance,
  UseGlobalFiltersInstanceProps,
  UsePaginationInstanceProps,
  UseRowSelectInstanceProps,
  UseTableInstanceProps,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table"
import { projects } from "../(data)/projects"
import { RenderLinks } from "./Links"
import SortDownIcon from "./icons/SortDownIcon"
import SortIcon from "./icons/SortIcon"
import SortUpIcon from "./icons/SortUpIcon"
import { Prose } from "./markdoc/Prose"

function PaginationButton({
  children,
  className,
  ...rest
}: {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode | ReactNode[]
}) {
  return (
    <button
      type="button"
      className={clsx(
        "text-tale-400 relative inline-flex items-center rounded-md border-0 px-4 py-2 text-sm font-medium ring-1 ring-inset ring-white/10 hover:bg-white/10 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

function PaginationGroupButton({
  children,
  className,
  ...rest
}: {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode | ReactNode[]
}) {
  return (
    <button
      type="button"
      className={clsx(
        "text-tale-400 relative inline-flex items-center border-0 bg-white/5 px-3 py-1.5 text-sm font-medium ring-1 ring-inset ring-white/10 placeholder:text-gray-500 hover:bg-white/10 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <div>
      <label
        htmlFor="location"
        className="text-tale-900 dark:text-tale-400 block text-sm font-medium leading-6"
      >
        {render("Header")}
      </label>
      <select
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 pl-3 pr-10 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
      >
        <option value="">All</option>
        {options.map((option: any, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export function ProjectsCell({ value }) {
  const projectSlugs = value.split(",")
  const projectsCount = projectSlugs.length

  if (projectsCount === 0) return null

  return (
    <div className="isolate flex -space-x-4 overflow-hidden">
      {projectSlugs.map((slug, index) => {
        const projectInfo = projects.find((project) => project.slug === slug)
        if (!projectInfo) return

        const zIndexClass = `z-${(projectsCount - index) * 10}`

        return (
          <Link
            key={slug}
            href={`/projects/${slug}`}
            className="group inline-block !shadow-none"
          >
            <Tooltip placement="top" overlay={projectInfo.title}>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-slate-800/5 ring-1 ring-slate-900/5 dark:border dark:border-slate-700/50 dark:bg-slate-700 dark:ring-0 group-hover:dark:bg-slate-600">
                <Image
                  className="h-8 w-8 rounded-full"
                  width={32}
                  height={32}
                  src={projectInfo.logo}
                  alt={projectInfo.title}
                />
              </div>
            </Tooltip>
          </Link>
        )
      })}
    </div>
  )
}

export function LinkCell({ value, column, row }) {
  const href = row.original[column.hrefAccessor]
  if (!value) return null
  if (!href) return value
  const image = row.original[column.imageAccessor]
  if (!image) {
    return (
      <Link href={href} target={column.linkTarget}>
        {value}
      </Link>
    )
  }

  const secondLinkTitle = row.original[column.secondLinkTitleAccessor]
  const secondLinkHref = row.original[column.secondLinkHrefAccessor]

  return (
    <div className="flex items-center gap-6">
      {image && (
        <Link
          href={href}
          target={column.linkTarget}
          className="group !shadow-none"
        >
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-slate-800/5 ring-1 ring-slate-900/5 dark:border dark:border-slate-700/50 dark:bg-slate-700 dark:ring-0 group-hover:dark:bg-slate-600">
            <Image
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
              src={image}
              alt={value}
            />
          </div>
        </Link>
      )}

      <div className="flex-1">
        <Prose className="text-sm">
          <Link href={href} target={column.linkTarget}>
            {value}
          </Link>
        </Prose>
        {secondLinkTitle && secondLinkHref && (
          <Prose className="text-sm">
            <Link href={secondLinkHref} target={column.secondLinkTarget}>
              {secondLinkTitle}
            </Link>
          </Prose>
        )}
      </div>
    </div>
  )
}

export function LinksCell({ value }) {
  return <RenderLinks linksMarkdownText={value} className="text-sm" />
}

const formatNumber = (number: number) => {
  if (number > 1e6) {
    return `${(number / 1e6).toFixed(1)}M`
  }

  if (number > 1e3) {
    return `${(number / 1e3).toFixed(1)}K`
  }

  return number.toFixed(0).toLocaleString()
}

export function NumberCell({ value }: { value: number }) {
  return <div>{formatNumber(value)}</div>
}

// Accepts 'months' as value. Replace it with 'days' in the future.
export function DurationCell({ value }: { value: number }) {
  if (!value) return <div>-</div>

  const months = value
  const days = months * 30
  const weeks = days / 7
  const formattedMonths = formatNumber(months)
  const formattedWeeks = formatNumber(weeks)
  const formattedDays = formatNumber(days)

  if (weeks < 3) {
    return (
      <div>
        {formattedDays} day{formattedDays === "1" ? "" : "s"}
      </div>
    )
  }

  if (months < 2) {
    return <div>{formattedWeeks} weeks</div>
  }

  return <div>{formattedMonths} months</div>
}

export function CurrencyCell({ value }: { value: number }) {
  return (
    <div>
      {value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </div>
  )
}

function Table({
  columns,
  data,
  initialState,
  minimal,
}: {
  columns: Column<any>[]
  data: any
  initialState: any
  minimal?: boolean
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page, which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as TableInstance<any> &
    UseTableInstanceProps<any> &
    UsePaginationInstanceProps<any> &
    UseRowSelectInstanceProps<any> &
    UseGlobalFiltersInstanceProps<any>

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setGlobalFilter(value)
  }

  return (
    <>
      {!minimal && (
        <div className="sm:flex sm:items-end sm:gap-x-2">
          {/* search input */}
          <input
            type="text"
            onChange={handleFilterInputChange}
            className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
            placeholder="Search..."
          />
          {/* filters */}
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              (column as any).Filter ? (
                <div className="mt-2 sm:mt-0" key={column.id}>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
        </div>
      )}

      {/* table */}
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-700"
            >
              <thead>
                {headerGroups.map((headerGroup, i) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                    {headerGroup.headers.map((column, j) => (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props
                      <th
                        scope="col"
                        className="group py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white first:sm:pl-0 last:sm:pr-0"
                        {...column.getHeaderProps(
                          (column as any).getSortByToggleProps()
                        )}
                        key={j}
                      >
                        <div className="flex items-center justify-between">
                          {column.render("Header")}
                          {/* Add a sort direction indicator */}
                          <span>
                            {(column as any).isSorted ? (
                              (column as any).isSortedDesc ? (
                                <SortDownIcon className="text-tale-400 h-4 w-4" />
                              ) : (
                                <SortUpIcon className="text-tale-400 h-4 w-4" />
                              )
                            ) : (
                              <SortIcon className="text-tale-400 h-4 w-4 opacity-0 group-hover:opacity-100" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="divide-y divide-gray-800"
              >
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()} key={i} className="border-b-0">
                      {row.cells.map((cell, j) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="whitespace-nowrap py-4 pl-4 pr-3 align-middle text-sm font-medium text-white first:sm:pl-0 last:sm:pr-0"
                            role="cell"
                            key={j}
                          >
                            {(cell.column.Cell as any).name ===
                            "defaultRenderer" ? (
                              <div className="text-tale-200 text-sm">
                                {cell.render("Cell")}
                              </div>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {!minimal && (
        <div className="flex items-center justify-between py-3">
          <div className="flex flex-1 justify-between sm:hidden">
            <PaginationButton
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </PaginationButton>
            <PaginationButton
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </PaginationButton>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-x-2">
              <span className="text-tale-900 dark:text-tale-400 text-sm font-medium leading-6">
                Page{" "}
                <span className="font-medium">
                  {(state as any).pageIndex + 1}
                </span>{" "}
                of <span className="font-medium">{pageOptions.length}</span>
              </span>
              <div>
                <select
                  value={(state as any).pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                  }}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-3 pr-10 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
                >
                  {[5, 10, 20].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <PaginationGroupButton
                  className="rounded-l-md"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">First</span>
                  <ChevronDoubleLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PaginationGroupButton>
                <PaginationGroupButton
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </PaginationGroupButton>
                <PaginationGroupButton
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </PaginationGroupButton>
                <PaginationGroupButton
                  className="rounded-r-md"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Last</span>
                  <ChevronDoubleRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PaginationGroupButton>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Table
