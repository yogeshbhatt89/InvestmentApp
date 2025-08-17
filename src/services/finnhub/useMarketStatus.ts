import { useMarketStatusQuery } from '../api'
import { useEffect, useState } from 'react'

export interface MarketStatusData {
  exchange: string
  timezone: string
  t: number
  isOpen: boolean
}

export interface MarketStatusResponse {
  success: {
    code: number
    message: string
    details: string
  }
  data: MarketStatusData
  timestamp: number
}

export interface MarketStatusError {
  code: number
  message: string
  details: string
}

export interface MarketStatusErrorResponse {
  error: MarketStatusError
  timestamp: number
}

export const useMarketStatus = (exchange: string) => {
  const shouldSkipQuery = !exchange || exchange.trim() === ''

  const { data, error, isLoading, isError, isSuccess } = useMarketStatusQuery(
    { exchange },
    { skip: shouldSkipQuery },
  )

  const [marketStatus, setMarketStatus] = useState<MarketStatusData | null>(null)

  useEffect(() => {
    if (data && data.data) {
      setMarketStatus(data.data)
    }
    if (shouldSkipQuery) {
      setMarketStatus(null)
    }
  }, [data, shouldSkipQuery])

  return {
    marketStatus,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
