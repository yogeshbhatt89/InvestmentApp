import React, { useState } from "react";
import { CircularProgress, TextField, Box } from "@mui/material";
import { debounce } from "lodash";
import { useSymbolLookup } from "../services/finnhub/useSymbolLookup"; // Adjust import based on where your hook is defined
import GridComponent from "./GridComponent"; // Import the GridComponent

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState(""); // Search input value
  // const [exchange, setExchange] = useState("US"); // Default exchange
  const { symbols, isLoading } = useSymbolLookup(inputValue, 'US'); // Fetch results based on the search query and exchange

  const debouncedSearch = debounce((query: string) => {
    setInputValue(query); // Set the search query after debounce
  }, 500);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value); // Trigger the debounced function on input change
  };

  // Prepare symbols data for GridComponent
  const symbolData = symbols.map((symbol) => symbol.displaySymbol); // Extracting just the displaySymbol to pass to the GridComponent

  return (
    <div>
      <TextField
        label="Search Symbol"
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        size="small"
      />
      {isLoading && <CircularProgress />}
      <Box mt={2}>
        {symbols.length > 0 && !isLoading ? (
          <GridComponent data={symbolData} />
        ) : (
          !isLoading && <div>No results found</div>
        )}
      </Box>
    </div>
  );
};

export default SearchComponent;
