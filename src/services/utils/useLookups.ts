import { useEffect } from 'react'
import { useCountriesQuery, useLanguagesQuery } from '../api'
import { useSnackbar } from '@/modules/Snackbar'

export interface Country {
  id: number
  code: string
  name: string
}

export interface Language {
  id: number
  code: string
  name: string
}

export const useCountries = () => {
  const snackbar = useSnackbar('global-snackbar')
  const { data, error, isLoading } = useCountriesQuery()

  useEffect(() => {
    if (error) {
      snackbar.show('Error loading countries', 'error')
    }
  }, [error, snackbar])

  return {
    countries: data,
    isLoading,
    error,
  }
}

export const useLanguages = () => {
  const snackbar = useSnackbar('global-snackbar')
  const { data, error, isLoading } = useLanguagesQuery()

  useEffect(() => {
    if (error) {
      snackbar.show('Error loading languages', 'error')
    }
  }, [error, snackbar])

  return {
    languages: data,
    isLoading,
    error,
  }
}
