import { useQuoteQuery } from '../api'
import { useEffect } from 'react'
import { useSnackbar } from '@/modules/Snackbar'

// Allow the hook to accept either a string or an array of strings.
export type TickerInput = string | string[]

export interface StockQuoteResponseDTO {
  /** Current price */
  currentPrice: number
  /** Price change */
  priceChange: number
  /** Percent change */
  percentChange: number
  /** High price of the day */
  highPrice: number
  /** Low price of the day */
  lowPrice: number
  /** Open price of the day */
  openPrice: number
  /** Previous close price */
  prevClosePrice: number
  /** Timestamp */
  timestamp: number
}
export interface QuoteResponseDTO {
  success: {
    code: number
    message: string
    details: string
  }
  data: StockQuoteResponseDTO
  timestamp: number
}
export const useQuoteSearch = (tickerInput: TickerInput) => {
  const { show } = useSnackbar('quoteSearchSnackbar')

  // Convert the input into a single comma-separated string.
  const ticker = typeof tickerInput === 'string' ? tickerInput : tickerInput.join(',')

  const shouldSkipQuery = ticker.trim() === ''

  // Call the RTK Query hook; backend now handles both single and bulk requests.
  const { data, error, isLoading, isError, isSuccess } = useQuoteQuery(
    { ticker },
    { skip: shouldSkipQuery },
  )

  // Show loading and success snackbars on transition.
  useEffect(() => {
    if (isLoading) {
      show('Searching for quote(s)...', 'info')
    } else if (isSuccess) {
      show('Quote(s) retrieved!', 'success')
    }
  }, [isLoading, isSuccess])

  useEffect(() => {
    if (isError) {
      const errorMessage = (error as any)?.data?.message || 'Quote lookup failed!'
      show(errorMessage, 'error')
    }
  }, [isError, error])

  const quoteResponse = data as QuoteResponseDTO
  const quote = quoteResponse && quoteResponse.data

  return {
    quote,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
