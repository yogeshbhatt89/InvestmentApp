import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (
        refreshResult.data &&
        (refreshResult.data as TokenResponse).accessToken
      ) {
        const newAccessToken = (refreshResult.data as TokenResponse)
          .accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }

  return result;
};

// 👇 API definition
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // I am able to register empty form. gotta fix this in back end.
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = api;
