import { useQuoteQuery } from '../api'
import { useEffect } from 'react'
import { useSnackbar } from '@/modules/Snackbar'

// Allow the hook to accept either a string or an array of strings.
export type TickerInput = string | string[]

export interface StockQuoteResponseDTO {
  /** Current price */
  c: number
  /** Change */
  d: number
  /** Percent change */
  dp: number
  /** High price of the day */
  h: number
  /** Low price of the day */
  l: number
  /** Open price of the day */
  o: number
  /** Previous close price */
  pc: number
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
  }, [isLoading, isSuccess, show])

  useEffect(() => {
    if (isError) {
      const errorMessage = (error as any)?.data?.message || 'Quote lookup failed!'
      show(errorMessage, 'error')
    }
  }, [isError, error, show])

  return {
    quote: data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
