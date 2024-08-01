import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event } from '../../schemas/EventSchema';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => '/events/',
    }),
  }),
});

export const { useGetEventsQuery }: {
  useGetEventsQuery: () => { data?: Event[], error?: any, isLoading: boolean }
} = eventsApi;

