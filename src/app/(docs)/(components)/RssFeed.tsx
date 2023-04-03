import { format, formatDistanceToNow } from "date-fns"
import Parser, { Item } from "rss-parser"
import { truncateText } from "../(utils)/text"
import { Card } from "./Card"

async function getFeed(feedUrl: string) {
  const parser = new Parser()
  const feed = await parser.parseURL(feedUrl)
  return feed
}

function Article({ article, source }: { article: Item; source?: string }) {
  const description =
    article["content:encodedSnippet"] || article.contentSnippet || ""
  const truncatedDescription = truncateText(
    description.replaceAll("\n", " "),
    240
  )
  const dateTime = article.isoDate ? new Date(article.isoDate) : undefined

  return (
    <Card as="article">
      <Card.Eyebrow decorate>{source}</Card.Eyebrow>
      <Card.Title href={article.link}>{article.title}</Card.Title>
      <Card.Description>{truncatedDescription}</Card.Description>
      <Card.Footer>
        <span>{article.creator}</span>
        {dateTime && (
          <time dateTime={article.isoDate}>
            {format(
              dateTime,
              "MMM d" +
                (dateTime.getFullYear() == new Date().getFullYear()
                  ? ""
                  : ", yyyy")
            )}
          </time>
        )}
        {dateTime && (
          <span>
            {formatDistanceToNow(dateTime, {
              addSuffix: true,
            })}
          </span>
        )}
      </Card.Footer>
      <Card.Cta>Read more</Card.Cta>
    </Card>
  )
}

export default async function RssFeed({ feedUrl }: { feedUrl: string }) {
  if (!feedUrl) return null

  const detailedFeed = await getFeed(feedUrl)

  return (
    <div className="flex flex-col gap-16">
      {detailedFeed.items.map((article) => (
        <Article
          key={article.link}
          article={article}
          source={detailedFeed.title}
        />
      ))}
    </div>
  )
}
