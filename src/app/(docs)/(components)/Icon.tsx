import clsx from "clsx"
import { useId } from "react"
import { LightbulbIcon } from "./icons/LightbulbIcon"
import { LogoIcon } from "./icons/LogoIcon"
import { ThemingIcon } from "./icons/ThemingIcon"
import { WarningIcon } from "./icons/WarningIcon"

export interface IconComponentProps {
  id: string
  color: string
}

const icons: { [mame: string]: React.FC<IconComponentProps> } = {
  logo: LogoIcon,
  theming: ThemingIcon,
  lightbulb: LightbulbIcon,
  warning: WarningIcon,
}

const iconStyles: { [color: string]: string } = {
  blue: "[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]",
  amber:
    "[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]",
}

export interface IconProps {
  className?: string
  color?: string
  icon: string
}

export const Icon: React.FC<IconProps> = ({
  color = "blue",
  icon,
  className,
  ...props
}) => {
  let id = useId()
  let IconComponent = icons[icon]

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={clsx(className, iconStyles[color])}
      {...props}
    >
      <IconComponent id={id} color={color} />
    </svg>
  )
}

const gradients: {
  [color: string]: { stopColor: string; offset?: string | number }[]
} = {
  blue: [
    { stopColor: "#0EA5E9" },
    { stopColor: "#22D3EE", offset: ".527" },
    { stopColor: "#818CF8", offset: 1 },
  ],
  amber: [
    { stopColor: "#FDE68A", offset: ".08" },
    { stopColor: "#F59E0B", offset: ".837" },
  ],
}

export function Gradient({ color = "blue", ...props }) {
  return (
    <radialGradient
      cx={0}
      cy={0}
      r={1}
      gradientUnits="userSpaceOnUse"
      {...props}
    >
      {gradients[color].map((stop, stopIndex) => (
        <stop key={stopIndex} {...stop} />
      ))}
    </radialGradient>
  )
}

export const LightMode: React.FC<any> = ({ className, ...props }) => {
  return <g className={clsx("dark:hidden", className)} {...props} />
}

export const DarkMode: React.FC<any> = ({ className, ...props }) => {
  return <g className={clsx("hidden dark:inline", className)} {...props} />
}
