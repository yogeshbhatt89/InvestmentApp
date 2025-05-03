import { useSymbolLookupQuery } from '../api'
import { useState, useEffect } from 'react'
import { useSnackbar } from '../../modules/SnackbarComponent'
import { debounce } from 'lodash'

interface Symbol {
  symbol: string
  displaySymbol: string
  description: string
  type: string
}

interface SymbolLookupError {
  data?: { message: string }
  status?: number
}

export const useSymbolLookup = (query: string, exchange: string) => {
  const { showSnackbar } = useSnackbar()
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  // Debounce the search query
  const debouncedSearch = debounce((value: string) => {
    setDebouncedQuery(value)
  }, 500)

  useEffect(() => {
    debouncedSearch(query)
    return () => {
      debouncedSearch.cancel()
    }
  }, [query, debouncedSearch])

  const shouldSkipQuery = debouncedQuery.trim() === ''

  const { data, error, isLoading, isError, isSuccess } = useSymbolLookupQuery(
    {
      query: debouncedQuery,
      exchange,
    },
    { skip: shouldSkipQuery },
  )

  const [symbols, setSymbols] = useState<Symbol[]>([])

  useEffect(() => {
    if (data && data.result) {
      setSymbols(data.result)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      const errorMessage = (error as SymbolLookupError)?.data?.message || 'Symbol lookup failed!'
      showSnackbar(errorMessage, 'error')
    }
  }, [isError, error, showSnackbar])

  useEffect(() => {
    if (isLoading) {
      showSnackbar('Searching for symbols...', 'info')
    } else if (isSuccess) {
      showSnackbar('Symbols found!', 'success')
    }
  }, [isLoading, isSuccess, showSnackbar])

  return {
    symbols,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
