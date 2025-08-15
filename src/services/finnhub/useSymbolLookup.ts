import { useSymbolLookupQuery } from '../api'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useSnackbar } from '@/modules/Snackbar'
import { debounce } from 'lodash'

export interface Symbol {
  symbol: string
  displaySymbol: string
  description: string
  type: string
}

interface SymbolLookupError {
  code: number
  message: string
  details: string
}

export interface SymbolLookupResponse {
  success: {
    code: number
    message: string
    details: string
  }
  data: {
    count: number
    result: Symbol[]
  }
  timestamp: number
}

export interface SymbolLookupErrorResponse {
  error: SymbolLookupError
  timestamp: number
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
    if (data && data.data && data.data.result) {
      setSymbols(data.data.result)
    }
  }, [data])

  const prevStatusRef = useRef({ isLoading: false, isSuccess: false })

  useEffect(() => {
    if (isLoading && !prevStatusRef.current.isLoading) {
      show('Searching for symbols...', 'info')
    } else if (isSuccess && !prevStatusRef.current.isSuccess) {
      show('Symbols found!', 'success')
    }
    prevStatusRef.current = { isLoading, isSuccess }
  }, [isLoading, isSuccess])

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as SymbolLookupErrorResponse)?.error?.message || 'Symbol lookup failed!'
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
