import clsx from "clsx"
import { ReactNode } from "react"

interface ButtonProps {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode | ReactNode[]
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

interface PageButtonProps {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode | ReactNode[]
}

export const PageButton: React.FC<PageButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
