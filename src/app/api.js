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
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { name, email, password },
      }),
    }),
  }),
});

export const {
  useGetMantrasQuery,
  useGetDeitiesQuery,
  useLoginMutation,
  useSignupMutation,
} = api;
