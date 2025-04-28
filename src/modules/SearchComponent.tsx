import React, { useState } from "react";
import { CircularProgress, TextField, Box, IconButton, InputAdornment, Paper, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useSymbolLookup } from "../services/finnhub/useSymbolLookup";
import GridComponent from "./GridComponent";
import ClearIcon from "@mui/icons-material/Clear"; // Clear icon for input

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [hasTouchedInput, setHasTouchedInput] = useState(false);

  const { symbols, isLoading } = useSymbolLookup(hasTouchedInput ? query : "", "US");

  const debouncedSearch = debounce((query: string) => {
    if (query.trim() !== "") {
      setQuery(query);
    } else {
      setQuery("");
    }
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleInputFocus = () => {
    setHasTouchedInput(true);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setQuery("");
  };

  const symbolData = symbols.map((symbol) => symbol.displaySymbol);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: 600,
        maxWidth: 600,
        margin: "20px auto",
        height: 500,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Search Symbols
      </Typography>

      <TextField
        label="Search Symbol"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        fullWidth
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            inputValue && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          ),
        }}
      />

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      <Box mt={2} flexGrow={1} overflow="auto">
        {query !== "" && symbols.length > 0 && !isLoading ? (
          <GridComponent data={symbolData} />
        ) : (
          query !== "" && !isLoading && <Typography>No results found</Typography>
        )}
      </Box>
    </Paper>

  );
};

export default SearchComponent;
