import { FeedCard } from "./FeedCard";

export type FeedCardResponse = {
    feeds: FeedCard[],
    error: string,
}