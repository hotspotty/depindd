import { ChevronRightIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import Link, { LinkProps } from "next/link"

interface ComponentProps<T extends React.ElementType> {
  as?: T
  className?: string
  children?: React.ReactNode
}

export function Card<T extends React.ElementType = "div">({
  as,
  className,
  children,
}: ComponentProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ComponentProps<T>>) {
  const Component = as || "div"
  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  )
}

Card.Link = function CardLink({
  children,
  ...props
}: LinkProps & { children?: React.ReactNode }) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-2.5 z-0 scale-95 bg-slate-50 opacity-0 transition duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-slate-800/50 sm:rounded-2xl md:-inset-x-6 md:-inset-y-4" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-2.5 z-20 sm:rounded-2xl md:-inset-x-6 md:-inset-y-4" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Title = function CardTitle<T extends React.ElementType = "h2">({
  as,
  href,
  children,
}: { href?: string } & ComponentProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ComponentProps<T>>) {
  const Component = as || "h2"
  return (
    <Component className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

Card.Description = function CardDescription({ children }) {
  return (
    <p className="relative z-10 mt-2 text-sm text-slate-700 dark:text-slate-500">
      {children}
    </p>
  )
}

Card.Cta = function CardCta({ children }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-sky-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-3 w-3 stroke-current" />
    </div>
  )
}

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...props
}: ComponentProps<T> & { decorate?: boolean } & Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof ComponentProps<T>
  >) {
  const Component = as || "p"
  return (
    <Component
      className={clsx(
        className,
        "relative z-10 order-first flex items-center text-sm leading-6 text-slate-400 dark:text-slate-400",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-slate-200 dark:bg-slate-500" />
        </span>
      )}
      {children}
    </Component>
  )
}
