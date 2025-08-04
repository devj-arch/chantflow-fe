import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import CONFIG from '../config';

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.BACKEND_URL,
    credentials: "include", // needed if your backend uses cookies/sessions
  }),
  endpoints: (builder) => ({
    getMantras: builder.query({
      query: () => '/mantras',
    }),
    getDeities: builder.query({
      query: () => '/deities',
    }),
  }),
});

export const {
  useGetMantrasQuery,
  useGetDeitiesQuery,
} = api;
