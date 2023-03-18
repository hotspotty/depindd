"use client"

import { slugifyWithCounter } from "@sindresorhus/slugify"
import type { MarkdocNextJsPageProps } from "@markdoc/next.js"
import { useRouter } from "next/navigation"

export type Props = MarkdocNextJsPageProps

const App: React.FC<Props> = (props) => {
  let router = useRouter()
  return <div>HOME</div>
}

export default App

//
// Utils
//

const metadata = {
  title: "My Page Title",
}
