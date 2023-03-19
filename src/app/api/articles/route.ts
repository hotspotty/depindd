import { glob } from "glob"
import { NextResponse } from "next/server"
import path from "path"

export const ARTICLES_PATH = "src/app/(docs)/(articles)"
const ARTICLES_DIR = path.join(process.cwd(), ARTICLES_PATH)

export async function GET() {
  const docPaths = await glob(path.join(ARTICLES_DIR, "**/*.md"))
  const articles = docPaths.map((docPath) => {
    const section = path
      .dirname(docPath.replace(ARTICLES_DIR, ""))
      .replace("/", "")
    const slug = path.basename(docPath, path.extname(docPath))
    return { section, slug }
  })

  return NextResponse.json(articles)
}
