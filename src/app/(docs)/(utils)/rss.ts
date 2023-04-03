import Parser from "rss-parser"
import { LinkItem, LinkType } from "../(data)/types"

export async function getFeed(feedUrl: string) {
  const parser = new Parser()
  const feed = await parser.parseURL(feedUrl)
  return feed
}

export interface RssFeedConfig {
  type: LinkType
  sourceUrl: string
  feedUrl: string
}

export async function getRssFeedConfigs(
  links: LinkItem[]
): Promise<RssFeedConfig[]> {
  const feedConfigs: RssFeedConfig[] = []

  for (const { type, url } of links) {
    let feedUrl = ""

    if (type === "medium" && url.includes("medium.com")) {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      const pathname = urlObj.pathname
      const isCustomDomain = hostname !== "medium.com"
      const rssPath = isCustomDomain ? "/feed" : "/feed/@"
      const username = pathname.replace(/^\/|\/$/g, "")

      feedUrl = `https://${hostname}${rssPath}${username}`
    } else if (type === "reddit" && url.includes("reddit.com")) {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      const pathname = urlObj.pathname

      feedUrl = `https://${hostname}${pathname}/.rss`
    } else if (type === "twitter" && url.includes("twitter.com")) {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      const username = pathname.replace(/^\/|\/$/g, "")

      feedUrl = `https://nitter.net/${username}/rss`
    } else {
      continue
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
