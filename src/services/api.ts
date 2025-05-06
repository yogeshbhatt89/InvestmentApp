import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { jwtDecode } from 'jwt-decode'
import { isUserInactive } from '../utils/userActivityTracker'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const token = localStorage.getItem('accessToken')

    if (
      endpoint !== 'login' &&
      endpoint !== 'register' &&
      !endpoint.includes('investments') &&
      token
    ) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    headers.set('Content-Type', 'application/json')
    return headers
  },
})

interface TokenResponse {
  accessToken: string
  refreshToken: string
}

interface DecodedToken {
  exp: number // Expiration time in seconds since the epoch
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
    return decoded.exp < currentTime
  } catch {
    return true // If decoding fails, treat the token as expired
  }
}

interface SymbolLookupResponse {
  count: number // Number of results
  result: Array<{
    symbol: string // Unique symbol
    displaySymbol: string // Display symbol name
    description: string // Symbol description
    type: string // Security type (e.g., "Equity", "ETF")
  }>
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const endpoint = typeof args === 'string' ? args : args.url

  // Skip token and inactivity checks for login and register endpoints
  if (
    endpoint === '/auth/login' ||
    endpoint === '/auth/register' ||
    endpoint.includes('investments')
  ) {
    return baseQuery(args, api, extraOptions)
  }

  const token = localStorage.getItem('accessToken')

  // Check if the user has been inactive for 15 minutes (900,000 ms)
  if (isUserInactive(900000)) {
    // Use 5000 ms for testing, revert to 900000 ms for production
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return { error: { status: 401, data: 'User inactive for too long' } }
  }

  if (token && isTokenExpired(token)) {
    const refreshToken = localStorage.getItem('refreshToken')

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data && (refreshResult.data as TokenResponse).accessToken) {
        const newAccessToken = (refreshResult.data as TokenResponse).accessToken
        localStorage.setItem('accessToken', newAccessToken)
      } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return { error: { status: 401, data: 'Unauthorized' } }
      }
    } else {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return { error: { status: 401, data: 'Unauthorized' } }
    }
  }

  // Proceed with the original request
  return baseQuery(args, api, extraOptions)
}

// 👇 API definition
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    register: builder.mutation({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: userData => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
    symbolLookup: builder.query<SymbolLookupResponse, { query: string; exchange: string }>({
      query: ({ query, exchange }) => ({
        url: `/investments/symbolLookup?q=${query}&exchange=${exchange}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useSymbolLookupQuery } = api
