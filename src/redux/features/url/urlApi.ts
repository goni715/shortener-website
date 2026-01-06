
import { apiSlice } from "../api/apiSlice";

export const urlApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createShortUrl: builder.mutation({
      query: (data) => ({
        url: "/url/create-short-url",
        method: "POST",
        body: data,
      })
    }),
  }),
});

export const { useCreateShortUrlMutation } = urlApi;
