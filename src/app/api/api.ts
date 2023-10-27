
import { FeedResponse } from "@/types/FeedResponse";
import { LoginData } from "@/types/LoginData";
import { UserFeed } from "@/types/UserFeed";
import { UserFeedResponse } from "@/types/UserFeedResponse";
import { client } from "@/utils/fetchClient";

export const getFeedData = (url:string, feeds: string[]) => {
  return client.post<FeedResponse>(url, feeds);
}

export const loginUser = (url: string, data: LoginData) => {
  return client.post<LoginData>(url, data)
}

export const getUserFeeds = (url: string) => {
  return client.get<UserFeedResponse>(url);
}

export const removeUserFeed = (id: number) => {
 return client.delete(`https://jsonplaceholder.typicode.com/posts/${id}`) 
}

export const getExternalFeeds = (params: string) => {
  return client.get(`http://fetchrss.com/api/v1/feed/list?auth=653b9f7ca558f61aa541bcf2.8imP38O7cpmi1QeWMt`)
}

export const createUserFeed = ({id, title, userId, body}: UserFeed) => {
  return client.post('https://jsonplaceholder.typicode.com/posts', { id, title, userId, body});
}

export const updateUserFeed = ({id, title, body}: UserFeed) => {
  return client.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, body })
}