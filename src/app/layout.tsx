import { Analytics } from "@vercel/analytics/react"
import "focus-visible"
import "../styles/tailwind.css"

type Props = {
  children: React.ReactNode
}

const isProduction = process.env.NODE_ENV === "production"

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html
      className="dark antialiased [font-feature-settings:'ss01']"
      lang="en"
      data-theme="system"
    >
      <body className="bg-white dark:bg-slate-900">
        {children}
        {isProduction && <Analytics />}
      </body>
    </html>
  )
}

export default RootLayout
