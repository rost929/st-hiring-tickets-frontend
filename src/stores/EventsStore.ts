import { configureStore } from '@reduxjs/toolkit';
import { eventsApi } from '../features/events/EventsApi';
import eventsReducer from '../features/events/EventsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const eventStore = configureStore({
  reducer: {
    events: eventsReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventsApi.middleware),
});

setupListeners(eventStore.dispatch);

export type RootState = ReturnType<typeof eventStore.getState>;
export type AppDispatch = typeof eventStore.dispatch;
