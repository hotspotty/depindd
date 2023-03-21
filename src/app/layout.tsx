import "focus-visible"
import "../styles/tailwind.css"

type Props = {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html
      className="dark antialiased [font-feature-settings:'ss01']"
      lang="en"
      data-theme="system"
    >
      <body className="bg-white dark:bg-slate-900">{children}</body>
    </html>
  )
}

export default RootLayout
