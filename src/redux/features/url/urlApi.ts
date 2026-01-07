
import TagTypes from "@/constant/tagType.constant";
import { apiSlice } from "../api/apiSlice";
import { IParam } from "@/types/global.type";

export const urlApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createShortUrl: builder.mutation({
      query: (data) => ({
        url: "/url/create-short-url",
        method: "POST",
        body: data,
      })
    }),
    getUrls: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/url/get-urls",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.urls],
    }),
  }),
});

export const { useCreateShortUrlMutation, useGetUrlsQuery } = urlApi;
