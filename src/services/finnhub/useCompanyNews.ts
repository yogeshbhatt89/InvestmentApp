import { useCompanyNewsQuery } from '../api'
import { useState, useEffect } from 'react'
import { useSnackbar } from '@/modules/Snackbar'
import { useBackdrop } from '@/modules/Backdrop/useBackdrop'
import { useLinearProgress } from '@/modules/LinearProgress'

export interface CompanyNews {
  category: string
  datetime: number
  headline: string
  id: string
  image: string
  source: string
  summary: string
  url: string
  related: string[]
}

interface CompanyNewsError {
  data?: { message: string }
  status?: number
}

export interface CompanyNewsResponse {
  success: {
    code: number
    message: string
    details: string
  }
  data: CompanyNews[]
  timestamp: number
}

export const useCompanyNews = (symbol: string, from: string, to: string) => {
  const snackbar = useSnackbar('global-snackbar')
  const backdrop = useBackdrop('global-backdrop')
  const { setProgress } = useLinearProgress('global-progress')

  const { data, error, isLoading, isError, isSuccess } = useCompanyNewsQuery({ symbol, from, to })

  const [news, setNews] = useState<CompanyNews[]>([])

  useEffect(() => {
    if (data && data.success && Array.isArray(data.data)) {
      setNews(data.data)
    }
  }, [data])

  useEffect(() => {
    if (isLoading) {
      backdrop.show()
      setProgress('Loading company news...')
    } else {
      backdrop.hide()
      setProgress('')
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      const message = data?.success?.message || 'Company news loaded!'
      setProgress(message)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as CompanyNewsError)?.data?.message || 'Company news failed to load!'
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
