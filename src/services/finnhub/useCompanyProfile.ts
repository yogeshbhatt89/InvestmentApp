import { useCompanyProfileQuery } from '../api'
import { useState, useEffect } from 'react'
import { useSnackbar } from '@/modules/Snackbar'
import { useBackdrop } from '@/modules/Backdrop/useBackdrop'
import { useLinearProgress } from '@/modules/LinearProgress'

export interface CompanyProfile {
  country: string
  currency: string
  exchange: string
  finnhubIndustry: string
  ipo: string
  logo: string
  marketCapitalization: number
  name: string
  phone: string
  shareOutstanding: number
  ticker: string
  weburl: string
  estimateCurrency: string
}

interface CompanyProfileError {
  data?: { message: string }
  status?: number
}

export interface CompanyProfileResponse {
  data: CompanyProfile
}

export const useCompanyProfile = (symbol: string) => {
  const snackbar = useSnackbar('global-snackbar')
  const backdrop = useBackdrop('global-backdrop')
  const { setProgress } = useLinearProgress('global-progress')

  const { data, error, isLoading, isError, isSuccess } = useCompanyProfileQuery({ symbol })

  const [profile, setProfile] = useState<CompanyProfile | null>(null)

  useEffect(() => {
    if (data && data.data) {
      setProfile(data.data)
    }
  }, [data])

  useEffect(() => {
    if (isLoading) {
      backdrop.show()
      setProgress('Loading company profile...')
    } else {
      backdrop.hide()
      setProgress('')
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      const message = data?.success?.message || 'Company profile loaded!'
      setProgress(message)
      // Optionally, you can clear the progress after a short delay:
      setTimeout(() => setProgress(''), 1000)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as CompanyProfileError)?.data?.message || 'Company profile failed to load!'
      snackbar.show(errorMessage, 'error')
    }
  }, [isError, error])

  return {
    profile,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
