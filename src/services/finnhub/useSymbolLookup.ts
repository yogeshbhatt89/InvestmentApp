import { useSymbolLookupQuery } from "../api";
import { useState, useEffect } from "react";
import { useSnackbar } from "../../modules/SnackbarComponent";
import { debounce } from "lodash"; // Import debounce from lodash

interface Symbol {
  symbol: string;
  displaySymbol: string;
  description: string;
  type: string;
}

interface SymbolLookupError {
  data?: { message: string };
  status?: number;
}

export const useSymbolLookup = (query: string, exchange: string) => {
  const { showSnackbar } = useSnackbar();
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Store the debounced query

  // Debounce the search query
  const debouncedSearch = debounce((value: string) => {
    setDebouncedQuery(value); // Set the debounced query to trigger the API call
  }, 500); // Adjust debounce delay as needed (500ms is a common delay)

  // Debounce the query input
  useEffect(() => {
    debouncedSearch(query); // Call the debounced function whenever query changes
    return () => {
      debouncedSearch.cancel(); // Cancel any pending debounced calls when component unmounts
    };
  }, [query, debouncedSearch]);

  const { data, error, isLoading, isError, isSuccess } = useSymbolLookupQuery({
    query: debouncedQuery, // Use the debounced query for the API request
    exchange,
  });

  const [symbols, setSymbols] = useState<Symbol[]>([]);

  useEffect(() => {
    if (data && data.result) {
      setSymbols(data.result);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as SymbolLookupError)?.data?.message || "Symbol lookup failed!";
      showSnackbar(errorMessage, "error");
    }
  }, [isError, error, showSnackbar]);

  useEffect(() => {
    if (isLoading) {
      showSnackbar("Searching for symbols...", "info");
    } else if (isSuccess) {
      showSnackbar("Symbols found!", "success");
    }
  }, [isLoading, isSuccess, showSnackbar]);

  return {
    symbols,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};
