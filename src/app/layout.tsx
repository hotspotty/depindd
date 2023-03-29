import { Analytics } from "@vercel/analytics/react"
import "focus-visible"
import "../styles/tailwind.css"

type Props = {
  children: React.ReactNode
}

export const metadata = {
  manifest: "/site.webmanifest",
  themeColor: "rgb(15,23,42)",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        color: "#5bbad5",
        url: "/safari-pinned-tab.svg",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  openGraph: {
    title: "DePIN DD by Hotspotty",
    description: "Everything you need for Due Diligence on DePIN",
    url: "https://depindd.com",
    siteName: "DePIN DD",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
}

const isProduction = process.env.NODE_ENV === "production"

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html
      className="dark antialiased [font-feature-settings:'ss01']"
      lang="en"
      data-theme="dark"
    >
      <body className="bg-white dark:bg-slate-900">
        {children}
        {isProduction && <Analytics />}
      </body>
    </html>
  )
}

export default RootLayout
