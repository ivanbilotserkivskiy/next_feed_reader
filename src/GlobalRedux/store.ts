'use client';

import { configureStore } from '@reduxjs/toolkit';
import authorizeReducer from './Features/authrize/authorizeSlice';
import feedSlice from './Features/feed/feedSlice';

export const store = configureStore({
  reducer: {
    authorize: authorizeReducer,
    feed: feedSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;