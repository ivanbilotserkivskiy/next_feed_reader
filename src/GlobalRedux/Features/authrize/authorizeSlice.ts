'use client';

import { createSlice } from "@reduxjs/toolkit";

export interface AuthorizeState {
  authorized: boolean
}

const noStorageState = {
  authorized: false,
}

const initializeStateFromLocalStorage = () => {
  const storedState = typeof window !== 'undefined' ? window.localStorage.getItem('authState') : false;
  if (storedState) {
    return JSON.parse(storedState);
  }
  return noStorageState;
};

const initialState: AuthorizeState = initializeStateFromLocalStorage()


export const authorizeSlice = createSlice({
  name: 'authorize',
  initialState,
  reducers: {
    login: (state) => { 
      state.authorized = true 
      localStorage.setItem('authState', JSON.stringify(state))
    },
    logout: (state) => { 
      state.authorized = false 
      localStorage.setItem('authState', JSON.stringify(state))
    }
  }
})

export const { login, logout } = authorizeSlice.actions;

export default authorizeSlice.reducer;