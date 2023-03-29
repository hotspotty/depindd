"use client"

import clsx from "clsx"
import React, { Fragment, ReactNode, useState } from "react"

interface Props {
  list: string[]
  listContentClsx?: string
  tabClsx?: {
    active: string
    inactive: string
    textActive: string
    textInactive: string
  }
  panels: ReactNode[]
}

const Tab: React.FC<Props> = ({ list, panels, listContentClsx, tabClsx }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={clsx(
          listContentClsx || "items-center justify-center",
          "my-10 flex h-9 overflow-hidden rounded-md"
        )}
      >
        {list.map((item, index) => (
          <span
            className={clsx(
              selectedIndex === index
                ? tabClsx?.active ||
                    "h-full rounded-md bg-sky-300 px-4 font-semibold text-slate-900 first:rounded-r-md last:rounded-l-md hover:bg-sky-200"
                : tabClsx?.inactive ||
                    "h-full bg-slate-800 px-4 font-medium text-white hover:bg-slate-700",
              "z-10 flex cursor-pointer items-center justify-center text-sm"
            )}
            onClick={() => setSelectedIndex(index)}
            key={item}
          >
            <span
              className={clsx(
                selectedIndex === index && tabClsx?.textActive,
                tabClsx?.textInactive
              )}
            >
              {item}
            </span>
          </span>
        ))}
      </div>

      <Fragment>{panels[selectedIndex]}</Fragment>
    </div>
  )
}

export default Tab
