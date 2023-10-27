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

const noStorageState: FeedState = {
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
  articles: [] as FeedItem[],
  status: 'idle',
  error: ''
}

const initializeStateFromLocalStorage = ()  => {
  const storedState = localStorage.getItem('f');
  if (storedState) {
    const subs: subscriptionItem[] =  JSON.parse(storedState);
    return {
      subscriptions: subs,
      articles: [] as FeedItem[],
      status: 'idle',
      error: ''}
      ;
  }
  return noStorageState;
};

const initialState: FeedState = initializeStateFromLocalStorage();

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    subscribe: (state, action) => { 
      const newSubscription: subscriptionItem = {
        id: nanoid(),
        link: action.payload,
      };
      state.subscriptions =  [...state.subscriptions, newSubscription ] 
      localStorage.setItem('f', JSON.stringify(state.subscriptions))
    },
    unsubscribe: (state, action) => {
      const subId = state.subscriptions.findIndex((subscription) => subscription.link === action.payload);
      console.log(subId)
      if (subId !== -1) {
       state.subscriptions = state.subscriptions.filter((_, index) => index !== subId);
      }
      localStorage.setItem('f', JSON.stringify(state.subscriptions))
    },
    setArticles: (state, action) => {
      state.articles = [...action.payload]
    }
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

