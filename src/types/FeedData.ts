import { FeedItem } from "./FeedItem";

export type FeedData = {
  feedUrl: string,
  items: FeedItem[],
  lastBuildDate: string,
  link: string,
  title: string,
}