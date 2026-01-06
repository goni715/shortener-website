/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SetLoginError,
  SetRegisterError,
  SetVerifyAccountOtpError,
} from "./authSlice";
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
    verifyAccountVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Account is verified successfully");
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/login";
          }, 300);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message;
          if (status === 500) {
            dispatch(SetVerifyAccountOtpError("Something Went Wrong"));
          } else {
            dispatch(SetVerifyAccountOtpError(message));
          }
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useVerifyAccountVerifyOtpMutation } = authApi;
