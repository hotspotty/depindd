// style={getLabelColorStyle(color, !withoutDarkMode && isDark)}

import clsx from "clsx"
import { getColorFromId, getLabelColorStyle } from "../(utils)/labels"

const isDark = true // TODO: make dynamic

export default function Labels({
  className,
  labelClassName,
  labels,
}: {
  className?: string
  labelClassName?: string
  labels: string[]
}) {
  if (labels.length === 0) return null
  return (
    <div className={clsx("-mx-2 space-y-4", className)}>
      {labels.map((label) => (
        <span
          key={label}
          style={getLabelColorStyle(getColorFromId(label), isDark)}
          className={clsx(
            "mx-2 inline-flex items-center rounded-md px-3 py-0.5 text-sm font-medium",
            labelClassName
          )}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
