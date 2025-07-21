import { useSymbolLookupQuery } from '../api'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useSnackbar } from '@/modules/Snackbar'
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

export interface SymbolLookupResponse {
  count: number // Number of results
  result: Array<{
    symbol: string // Unique symbol
    displaySymbol: string // Display symbol name
    description: string // Symbol description
    type: string // Security type (e.g., "Equity", "ETF")
  }>
}
export const useSymbolLookup = (query: string, exchange: string) => {
  // Pass a unique snackbarId to the useSnackbar hook.
  const { show } = useSnackbar('symbolLookupSnackbar')
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  // Memoize the debounced function so it doesn't recreate on every render.
  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setDebouncedQuery(value)
    }, 500)
  }, [])

  useEffect(() => {
    debouncedSearch(query)
    return () => {
      debouncedSearch.cancel()
    }
  }, [query, debouncedSearch])

  const shouldSkipQuery = debouncedQuery.trim() === ''

  // Query the API using the debounced value.
  const { data, error, isLoading, isError, isSuccess } = useSymbolLookupQuery(
    { query: debouncedQuery, exchange },
    { skip: shouldSkipQuery },
  )

  const [symbols, setSymbols] = useState<Symbol[]>([])

  useEffect(() => {
    if (data && data.result) {
      setSymbols(data.result)
    }
  }, [data])

  // We use a ref to hold the previous status values so we only show snackbars on transitions.
  const prevStatusRef = useRef({ isLoading: false, isSuccess: false })

  useEffect(() => {
    // Only show loading message on transition.
    if (isLoading && !prevStatusRef.current.isLoading) {
      show('Searching for symbols...', 'info')
    }
    // Only show success message on transition.
    else if (isSuccess && !prevStatusRef.current.isSuccess) {
      show('Symbols found!', 'success')
    }
    prevStatusRef.current = { isLoading, isSuccess }
  }, [isLoading, isSuccess])

  useEffect(() => {
    if (isError) {
      const errorMessage = (error as SymbolLookupError)?.data?.message || 'Symbol lookup failed!'
      show(errorMessage, 'error')
    }
  }, [isError, error])

  return {
    symbols,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
