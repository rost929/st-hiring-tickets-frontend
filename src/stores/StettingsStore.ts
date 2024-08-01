import { configureStore } from '@reduxjs/toolkit';
import { settingsApi } from '../features/settings/SettingsApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const settingStore = configureStore({
  reducer: {
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(settingsApi.middleware),
});

setupListeners(settingStore.dispatch);

export type RootState = ReturnType<typeof settingStore.getState>;
export type AppDispatch = typeof settingStore.dispatch;


/* import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/SettingsSlice';

const settingsStore = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={settingsStore}>{children}</Provider>;
}; */