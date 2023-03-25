import clsx from "clsx"
import {
  getColorFromId,
  getLabelColorStyle,
  transformLabels,
} from "../(utils)/labels"

const isDark = true // TODO: make dynamic

export default function Labels({
  className,
  labelClassName,
  labels,
}: {
  className?: string
  labelClassName?: string
  labels: string | string[] | undefined
}) {
  const transformedLabels = transformLabels(labels)

  if (transformedLabels.length === 0) return null

  return (
    <div className={clsx("-mx-1 space-y-3", className)}>
      {transformedLabels.map((label) => (
        <span
          key={label}
          style={getLabelColorStyle(getColorFromId(label), isDark)}
          className={clsx(
            "mx-1 inline-flex items-center rounded-md px-3 py-0.5 text-sm font-medium",
            labelClassName
          )}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
