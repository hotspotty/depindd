import fs from "fs"
import Markdoc from "react-markdown"
import path from "path"

const AboutPage = async (props) => {
  const content = await getContent(props.params.slug)

  return <Markdoc>{content}</Markdoc>
}

export default AboutPage

//
// Utils
//

const getContent = async (slug: string) => {
  const filePath = path.join(process.cwd(), `src/docs/about/${slug}.md`)
  const content = fs.readFileSync(filePath, "utf-8")

  return content
}
