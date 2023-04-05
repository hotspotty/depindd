import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { slugToTitle } from "../../(utils)/text"
import Labels from "../Labels"

interface QuickLinksProps {
  className?: string
  children: React.ReactNode | React.ReactNode[]
}

export const QuickLinks: React.FC<QuickLinksProps> = ({
  className,
  children,
}) => {
  return (
    <ul
      className={clsx(
        "not-prose my-10 grid grid-cols-1 gap-x-6 gap-y-10 pl-0 sm:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {children}
    </ul>
  )
}

const transformLabels = (labels: string | string[] | undefined) => {
  switch (typeof labels) {
    case "object":
      return labels
    case "string":
      return labels.split(/[,;]+/)
    default:
      return []
  }
}

interface QuickLinkProps {
  title: string
  description?: string
  labels?: string[]
  href: string
  image?: string
  className?: string
}

export const QuickLink: React.FC<QuickLinkProps> = ({
  title,
  description,
  labels,
  href,
  image,
  className,
}) => {
  const transformedLabels = transformLabels(labels)
  return (
    <li className={clsx("group relative flex flex-row-reverse", className)}>
      <div className="peer ml-4 flex-auto">
        <h4 className="font-semibold leading-6 text-slate-900 dark:text-slate-200">
          <Link
            className="before:absolute before:-inset-3 before:rounded-2xl"
            href={href}
          >
            {title}
            <svg
              viewBox="0 0 3 6"
              className="-mt-px ml-3 inline h-1.5 w-auto overflow-visible text-slate-400 opacity-0 transition duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
            >
              <path
                d="M0 0L3 3L0 6"
                fill="none"
                stroke-width="2"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </h4>
        {description && (
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-400">
            {description}
          </p>
        )}
        <Labels
          labels={transformedLabels.map((label) => ({
            title: slugToTitle(label),
          }))}
        />
      </div>
      {image && (
        <div className="dark:highlight-white/5 flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow ring-1 ring-slate-900/5 transition duration-200 dark:bg-slate-800 group-hover:dark:bg-slate-600 ">
          <Image
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
            src={image}
            alt={title}
          />
        </div>
      )}
      <div className="absolute -inset-3 -z-10 rounded-2xl bg-slate-50 opacity-0 transition duration-200 peer-hover:opacity-100 dark:bg-slate-800/50" />
    </li>
  )
}
