import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ebook-backend-production.up.railway.app",
    credentials: 'include'
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
