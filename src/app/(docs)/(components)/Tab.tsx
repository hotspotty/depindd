"use client"

import clsx from "clsx"
import React, { ReactNode, useState } from "react"

interface Props {
  list: string[]
  panels: ReactNode[]
}

const Tab: React.FC<Props> = ({ list, panels }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="flex w-full flex-col items-center">
      <div className="my-10 flex h-9 items-center justify-center overflow-hidden rounded-md">
        {list.map((item, index) => (
          <span
            className={clsx(
              selectedIndex === index
                ? "rounded-md bg-sky-300 font-semibold text-slate-900 first:rounded-r-md last:rounded-l-md hover:bg-sky-200"
                : "bg-slate-800 font-medium text-white hover:bg-slate-700",
              "z-10 flex h-full cursor-pointer items-center justify-center px-4 text-sm"
            )}
            onClick={() => setSelectedIndex(index)}
            key={item}
          >
            {item}
          </span>
        ))}
      </div>

      <div>{panels[selectedIndex]}</div>
    </div>
  )
}

export default Tab
