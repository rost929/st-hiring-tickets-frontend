import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Settings } from "../../schemas/SettingsSchema";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getSettings: builder.query<Settings, number>({
      query: (clientId) => `/settings/${clientId}`,
    }),
    putSettings: builder.mutation<Settings, Settings>({
      query: (updatedSettings) => ({
        url: "/settings",
        method: "PUT",
        body: updatedSettings,
      }),
    }),
  }),
});

export const { useGetSettingsQuery, usePutSettingsMutation } = settingsApi;