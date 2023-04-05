import { format, formatDistanceToNow } from "date-fns"
import { LinkItem } from "../(data)/types"
import { RssArticle, getRssFeed } from "../(utils)/rss"
import { Card } from "./Card"

function Article({
  article: { sourceLabel, link, title, description, author, date },
}: {
  article: RssArticle
}) {
  const dateTime = date ? new Date(date) : undefined

  return (
    <Card as="article">
      <Card.Eyebrow decorate>{sourceLabel}</Card.Eyebrow>
      <Card.Title href={link}>{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Footer>
        <span>{author}</span>
        {dateTime && (
          <time dateTime={date}>
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
    </Card>
  )
}

export default async function RssFeed({
  className,
  links,
}: {
  className?: string
  links: LinkItem[]
}) {
  const rssFeed = await getRssFeed(links)

  if (rssFeed.length === 0) return null

  return (
    <div className={className}>
      <div className="mt-12 border-t border-slate-200 pt-12 dark:border-slate-800">
        <h1 className="mb-10 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-4xl">
          News
        </h1>
        <div className="flex flex-col gap-10">
          {rssFeed.map((article) => (
            <Article key={article.link} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
