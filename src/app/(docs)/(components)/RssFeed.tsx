import { format, formatDistanceToNow } from "date-fns"
import { Item } from "rss-parser"
import { LinkType } from "../(data)/types"
import { getFeed } from "../(utils)/rss"
import { truncateText } from "../(utils)/text"
import { Card } from "./Card"

function Article({
  article,
  source,
}: {
  article: Item & { author?: string }
  source?: string
}) {
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
        <span>{article.creator || article.author}</span>
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

export default async function RssFeed({
  type,
  feedUrl,
}: {
  type: LinkType
  feedUrl: string
}) {
  let detailedFeed

  try {
    detailedFeed = await getFeed(feedUrl)
  } catch (e) {
    return
  }

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
