'use client';

import { RootState } from "@/GlobalRedux/store";
import { FeedItem } from "@/types/FeedItem";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";


interface subscriptionItem {
  id: string,
  link: string,
}

export interface FeedState {
  subscriptions: subscriptionItem[],
  articles: FeedItem[],
  status: string,
  error: string,
}

interface FeedArticlesResponse {
  feeds: FeedItem[],
  error: string,
}

export const fetchByLink = createAsyncThunk<FeedArticlesResponse, string,  { state: RootState }>('feed/articles', async (url) => {
  try {
    const response = await fetch('/api/feed/articles', { method: 'POST', body: JSON.stringify(url) })
    .then(data => data.json());

    return response
  } catch (err) {
    return err;
  }
})

const initialState: FeedState = {
  subscriptions: [
    {
      id: '1',
      link: 'https://www.reddit.com/.rss',
    },
    {
      id: '2',
      link:  'https://www.nasa.gov/news-release/feed/',
    },
    {
      id: '3',
      link: 'https://rss.app/feeds/tPcnaTmHkIuDz6R3.xml',
    },   


  ],
  articles: [],
  status: 'idle',
  error: ''
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    subscribe: (state, action) => { state.subscriptions.push(action.payload) },
    unsubscribe: (state, action) => { state.subscriptions.filter((subscription) => subscription.id !== action.payload.id) },
    setArticles: (state, action) => {state.articles = [...action.payload]}
  },
  extraReducers(builder) {
    builder.addCase(fetchByLink.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchByLink.fulfilled, (state, action) => {
      state.status = 'succeeded';

      state.articles = action.payload.feeds;
    })
  }
})

export const { subscribe, unsubscribe, setArticles } = feedSlice.actions;


export default feedSlice.reducer;

