import Image from "next/image"
import Link from "next/link"
import Tooltip from "rc-tooltip"
import { projects } from "../(data)/projects"

export function ProjectLogoChain({ slugs }: { slugs: string }) {
  // comma separated slugs
  const projectSlugs: string[] = slugs.split(",")

  if (projectSlugs.length === 0) return null

  return (
    <div className="isolate flex -space-x-4 overflow-hidden">
      {projectSlugs.map((slug) => {
        const projectInfo = projects.find((project) => project.slug === slug)
        if (!projectInfo) return

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
