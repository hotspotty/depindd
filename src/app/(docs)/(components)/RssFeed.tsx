import { format, formatDistanceToNow } from "date-fns"
import Parser, { Item } from "rss-parser"
import { truncateText } from "../(utils)/text"
import { Card } from "./Card"

async function getFeed(feedUrl: string) {
  const parser = new Parser()
  const feed = await parser.parseURL(feedUrl)
  return feed
}

function Article({ article }: { article: Item }) {
  const description =
    article["content:encodedSnippet"] || article.contentSnippet || ""
  const truncatedDescription = truncateText(
    description.replaceAll("\n", " "),
    200
  )

  return (
    <Card as="article">
      <Card.Title href={article.link}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.isoDate}>
        {article.isoDate && (
          <>
            <span>{format(new Date(article.isoDate), "PP")}</span>
            <span className="ml-2">
              (
              {formatDistanceToNow(new Date(article.isoDate), {
                addSuffix: true,
              })}
              )
            </span>
          </>
        )}
      </Card.Eyebrow>
      <Card.Description>{truncatedDescription}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export default async function RssFeed({ feedUrl }: { feedUrl: string }) {
  if (!feedUrl) return null

  const detailedFeed = await getFeed(feedUrl)

  return (
    <div className="flex flex-col gap-16">
      {detailedFeed.items.map((article) => (
        <Article key={article.link} article={article} />
      ))}
    </div>
  )
}
