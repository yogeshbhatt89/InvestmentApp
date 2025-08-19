import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { jwtDecode } from 'jwt-decode'
import { isUserInactive } from '../utils/userActivityTracker'
import type { QuoteResponseDTO } from './finnhub/useQuoteSearch'
import type { SymbolLookupResponse } from './finnhub/useSymbolLookup'
import { BatchQuoteResponse } from './finnhub/useBatchQuoteSearch'
import type { RecommendationTrendsResponse } from './finnhub/useRecommendationTrends'
import { Country, Language } from './utils/useLookups'
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
    countries: builder.query<Country[], void>({
      query: () => ({
        url: '/lookups/countries',
        method: 'GET',
      }),
    }),
    languages: builder.query<Language[], void>({
      query: () => ({
        url: '/lookups/languages',
        method: 'GET',
      }),
    }),
    symbolLookup: builder.query<SymbolLookupResponse, { query: string; exchange: string }>({
      query: ({ query, exchange }) => ({
        url: `/investments/symbolLookup?q=${query}&exchange=${exchange}`,
        method: 'GET',
      }),
    }),
    marketNews: builder.query<any, { category: string; minId?: number }>({
      query: ({ category, minId }) => ({
        url: `/investments/marketNews?category=${category}${minId ? `&minId=${minId}` : ''}`,
        method: 'GET',
      }),
    }),
    quote: builder.query<QuoteResponseDTO, { ticker: string }>({
      query: ({ ticker }) => ({
        url: `/investments/quote?ticker=${ticker}`,
        method: 'GET',
      }),
    }),
    batchQuotes: builder.query<BatchQuoteResponse, { symbols: string }>({
      query: ({ symbols }) => ({
        url: `/investments/batchQuotes?symbols=${symbols}`,
        method: 'GET',
      }),
    }),
    marketStatus: builder.query<any, { exchange: string }>({
      query: ({ exchange }) => ({
        url: `/investments/marketStatus?exchange=${exchange}`,
        method: 'GET',
      }),
    }),
    companyProfile: builder.query<any, { symbol: string }>({
      query: ({ symbol }) => ({
        url: `/investments/companyProfile?symbol=${symbol}`,
        method: 'GET',
      }),
    }),
    companyNews: builder.query<any, { symbol: string; from: string; to: string }>({
      query: ({ symbol, from, to }) => ({
        url: `/investments/companyNews?symbol=${symbol}&from=${from}&to=${to}`,
        method: 'GET',
      }),
    }),
    recommendationTrends: builder.query<RecommendationTrendsResponse, { ticker: string }>({
      query: ({ ticker }) => ({
        url: `/investments/recommendationTrends?ticker=${ticker}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useCountriesQuery,
  useLanguagesQuery,
  useSymbolLookupQuery,
  useQuoteQuery,
  useMarketNewsQuery,
  useBatchQuotesQuery,
  useMarketStatusQuery,
  useCompanyProfileQuery,
  useCompanyNewsQuery,
  useRecommendationTrendsQuery,
} = api
