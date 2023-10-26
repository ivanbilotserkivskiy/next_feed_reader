
import { FeedResponse } from "@/types/FeedResponse";
import { client } from "@/utils/fetchClient";

export const getFeedData = (url:string, feeds: string[]) => {
  return client.post<FeedResponse>(url, feeds);
}
