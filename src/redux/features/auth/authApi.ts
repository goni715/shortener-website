/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetLoginError, SetRegisterError } from "./authSlice";
import { apiSlice } from "../api/apiSlice";
import { setToken, setVerifyEmail } from "@/helpers/SessionHelper";
import { SuccessToast } from "@/helpers/ValidationHelper";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register-user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setVerifyEmail(email);
          SuccessToast("Please check you email");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetRegisterError("Something Went Wrong"));
          } else {
            dispatch(SetRegisterError(message));
          }
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login-user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.accessToken;
          setToken(token);
          SuccessToast("Login Success");
          setTimeout(() => {
            window.location.href = "/";
          }, 300);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetLoginError("Something Went Wrong"));
          } else {
            dispatch(SetLoginError(message));
          }
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi;
