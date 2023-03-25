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
  labels: { title: string; url?: string }[]
}) {
  if (labels.length === 0) return null

  return (
    <div className={clsx("-mx-1", className)}>
      {labels.map(({ title, url }) =>
        url ? (
          <a href={url} key={title}>
            <span
              style={getLabelColorStyle(getColorFromId(title), isDark)}
              className={clsx(
                "mx-1 my-1.5 inline-flex cursor-pointer items-center rounded-md px-3 py-0.5 text-sm font-medium hover:underline",
                labelClassName
              )}
            >
              {title}
            </span>
          </a>
        ) : (
          <span
            key={title}
            style={getLabelColorStyle(getColorFromId(title), isDark)}
            className={clsx(
              "mx-1 my-1.5 inline-flex items-center rounded-md px-3 py-0.5 text-sm font-medium hover:underline",
              labelClassName
            )}
          >
            {title}
          </span>
        )
      )}
    </div>
  )
}
