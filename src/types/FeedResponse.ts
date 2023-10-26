import { FeedData } from "./FeedData";

export type FeedResponse = {
  feeds: FeedData[],
  error: string,
}