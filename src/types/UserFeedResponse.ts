import { UserFeed } from "./UserFeed"

export type UserFeedResponse = {
  feeds: UserFeed[],
  error: string
}