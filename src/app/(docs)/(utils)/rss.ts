import Parser from "rss-parser"
import { LinkItem, LinkType } from "../(data)/types"
import { slugToTitle, truncateText } from "./text"

async function getFeed(feedUrl: string) {
  const parser = new Parser()
  const feed = await parser.parseURL(feedUrl)
  return feed
}

export interface RssFeedConfig {
  type: LinkType
  sourceUrl: string
  feedUrl: string
}

async function getRssFeedConfigs(links: LinkItem[]): Promise<RssFeedConfig[]> {
  const feedConfigs: RssFeedConfig[] = []

  for (const { type, url } of links) {
    if (!url) continue

    let feedUrl = ""

    if (type === "medium") {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      const pathname = urlObj.pathname
      const isCustomDomain = hostname !== "medium.com"
      const rssPath = isCustomDomain ? "/feed" : "/feed/"
      const username = pathname.replace(/^\/|\/$/g, "")

      feedUrl = `https://${hostname}${rssPath}${username}`
    } else if (type === "reddit") {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      const pathname = urlObj.pathname

      feedUrl = `https://${hostname}${pathname}/.rss`
    } else if (type === "twitter") {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      const username = pathname.replace(/^\/|\/$/g, "")

      feedUrl = `https://nitter.net/${username}/rss`
    }

    if (feedUrl) {
      feedConfigs.push({
        type,
        sourceUrl: url,
        feedUrl,
      })
    }
  }

  return feedConfigs
}

export interface RssArticle {
  sourceLabel: string
  link: string
  title: string
  description: string
  author: string
  date: string
}

export async function getRssFeed(links: LinkItem[]) {
  const rssFeedConfigs = await getRssFeedConfigs(links)

  const rssArticles: RssArticle[] = []

  for await (const { type, feedUrl } of rssFeedConfigs) {
    let detailedFeed

    try {
      detailedFeed = await getFeed(feedUrl)
    } catch (e) {
      console.log(`RSS Feed failed: ${feedUrl}`)
      console.log(e)
      continue
    }

    detailedFeed?.items.forEach((article) => {
      const description =
        article["content:encodedSnippet"] || article.contentSnippet || ""
      const truncatedDescription = truncateText(
        description.replaceAll("\n", " "),
        240
      )!
      let link = article.link

      if (type === "twitter") {
        link = link.replace("nitter.net", "twitter.com")
      }

      rssArticles.push({
        sourceLabel: slugToTitle(type),
        link,
        title: article.title,
        description: truncatedDescription,
        author: article.creator || article.author,
        date: article.isoDate,
      })
    })
  }

  rssArticles.sort(
    (d1: RssArticle, d2: RssArticle) =>
      new Date(d2.date).getTime() - new Date(d1.date).getTime()
  )

  return rssArticles
}
