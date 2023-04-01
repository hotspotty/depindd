import clsx from "clsx"
import Link from "next/link"
import { getColorFromId, getLabelColorStyle } from "../(utils)/labels"

const isDark = true // TODO: make dynamic

function Label({
  title,
  className,
  ...otherProps
}: {
  title: string
  className?: string
}) {
  return (
    <span
      style={getLabelColorStyle(getColorFromId(title), isDark)}
      className={clsx(
        "mx-1 my-1.5 inline-flex cursor-pointer items-center rounded-md px-3 py-0.5 text-sm font-medium hover:underline",
        className
      )}
      {...otherProps}
    >
      {title}
    </span>
  )
}

export interface Label {
  title: string
  url?: string
  samePage?: boolean
  target?: string
}

export default function Labels({
  className,
  labels,
}: {
  className?: string
  labels: Label[] // The samePage is needed to swap Link with an anchor tag because the scroll to item is not working: https://github.com/vercel/next.js/issues/44295
}) {
  if (labels.length === 0) return null

  return (
    <div className={clsx("-mx-1", className)}>
      {labels.map(({ title, url, samePage, target = "_blank" }) => {
        if (!url) {
          return (
            <Label
              key={title}
              title={title}
              className="cursor-pointer hover:underline"
            />
          )
        }

        if (samePage) {
          return (
            <a key={title} href={url}>
              <Label title={title} className="cursor-pointer hover:underline" />
            </a>
          )
        }

        return (
          <Link href={url} key={title} target={target}>
            <Label title={title} className="cursor-pointer hover:underline" />
          </Link>
        )
      })}
    </div>
  )
}
