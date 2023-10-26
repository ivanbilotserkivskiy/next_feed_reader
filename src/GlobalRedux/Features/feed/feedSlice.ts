'use client';

import { createSlice } from "@reduxjs/toolkit";

export interface FeedState {
  subscriptions: string[],
}

const initialState: FeedState = {
  subscriptions: [
    'https://www.reddit.com/.rss',
    'https://www.nasa.gov/news-release/feed/',
    'https://www.mobileworldlive.com/latest-stories/feed/',
  ]
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    subscribe: (state, action) => { state.subscriptions.push(action.payload) },
    unsubscribe: (state, action) => { state.subscriptions.filter((subscription: string) => subscription !== action.payload) }
  }
})

export const { subscribe, unsubscribe } = feedSlice.actions;

export default feedSlice.reducer;