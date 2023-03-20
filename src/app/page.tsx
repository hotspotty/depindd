import { redirect } from "next/navigation"

export const metadata = {
  title: "DePIN DD",
}

export default function Home() {
  redirect("/about/what-is-depin")
}
