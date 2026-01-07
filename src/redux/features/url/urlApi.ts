/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/constant/tagType.constant";
import { apiSlice } from "../api/apiSlice";
import { IParam } from "@/types/global.type";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";

export const urlApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createShortUrl: builder.mutation({
      query: (data) => ({
        url: "/url/create-short-url",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.urls];
        }
        return [];
      },
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
    deleteUrl: builder.mutation({
      query: (id) => ({
        url: `/url/delete-url/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.urls];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Url is deleted successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          } else {
            ErrorToast(message);
          }
        }
      },
    }),
  }),
});

export const {
  useCreateShortUrlMutation,
  useGetUrlsQuery,
  useDeleteUrlMutation,
} = urlApi;
