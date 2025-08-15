import { useMarketNewsQuery } from '../api'
import { useState, useEffect } from 'react'
import { useSnackbar } from '@/modules/Snackbar'
import { useBackdrop } from '@/modules/Backdrop/useBackdrop'
import { useLinearProgress } from '@/modules/LinearProgress'

export interface MarketNews {
  category: string
  datetime: string
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

interface MarketNewsError {
  data?: { message: string }
  status?: number
}

export interface MarketNewsResponse {
  count: number // Number of results
  news: Array<MarketNews>
}
export const useMarketNews = (category: string, minId?: number) => {
  const snackbar = useSnackbar('global-snackbar')
  const backdrop = useBackdrop('global-backdrop')
  const { setProgress } = useLinearProgress('global-progress')

  const { data, error, isLoading, isError, isSuccess } = useMarketNewsQuery({ category, minId })

  const [news, setNews] = useState<MarketNews[]>([])

  useEffect(() => {
    if (data && data.success && data.data) {
      setNews(data.data)
    }
  }, [data])

  useEffect(() => {
    if (isLoading) {
      backdrop.show()
      setProgress('Loading market news...')
    } else {
      backdrop.hide()
      setProgress('')
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      snackbar.show('Market news loaded!', 'success')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as MarketNewsError)?.data?.message || 'Market news failed to load!'
      snackbar.show(errorMessage, 'error')
    }
  }, [isError, error])

  return {
    news,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
