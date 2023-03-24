import { config } from "@/app/(docs)/config.markdoc"
import Markdoc from "@markdoc/markdoc"

export default function getMarkdownContentFromText(text: string) {
  const ast = Markdoc.parse(text)
  return Markdoc.transform(ast, config)
}
