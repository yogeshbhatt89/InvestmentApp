import { useBatchQuotesQuery } from '../api'

export interface BatchQuoteError {
  code: number
  message: string
  details: string
}

export interface BatchStockQuoteResponseDTO {
  currentPrice: number
  priceChange: number
  percentChange: number
  highPrice: number
  lowPrice: number
  openPrice: number
  prevClosePrice: number
  timestamp: number
}

export interface BatchQuote {
  symbol: string
  data: BatchStockQuoteResponseDTO
}

export interface BatchQuoteResponse {
  success: {
    code: number
    message: string
    details: string
  }
  data: {
    quotes: BatchQuote[]
  }
  failedSymbols?: string[]
  timestamp: number
}
export interface BatchQuoteErrorResponse {
  error: BatchQuoteError
}

export const useBatchQuoteSearch = (symbols: string) => {
  const shouldSkip = !symbols || symbols.trim() === ''
  const { data, error, isLoading, isError, isSuccess, isFetching } = useBatchQuotesQuery(
    { symbols },
    { skip: shouldSkip },
  )
  return {
    data: data?.data.quotes,
    isLoading: shouldSkip ? false : isLoading,
    isFetching: shouldSkip ? false : isFetching,
    isError,
    isSuccess,
    error,
  }
}
