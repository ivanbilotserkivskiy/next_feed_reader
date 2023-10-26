'use client';

import { createSlice } from "@reduxjs/toolkit";

export interface AuthorizeState {
  authorized: boolean
}

const initialState: AuthorizeState = {
  authorized: true
}

export const authorizeSlice = createSlice({
  name: 'authorize',
  initialState,
  reducers: {
    login: (state) => { state.authorized = true },
    logout: (state) => { state.authorized = false }
  }
})

export const { login, logout } = authorizeSlice.actions;

export default authorizeSlice.reducer;