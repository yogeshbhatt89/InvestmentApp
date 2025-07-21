import React from 'react';
import TableWrapperComponent from '@/modules/Table';
import TextFieldComponent from '@/modules/TextField';
import { useSymbolLookup } from '@/services/finnhub/useSymbolLookup';
import { useTextField } from '@/modules/TextField';
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'


const LiveSearchSymbolLookup: React.FC = () => {
  // Get the redux-controlled text field value via your custom hook.
  const { getTextFieldValue } = useTextField('symbolLookupSearch')
  // Hardcode exchange for demo purposes.
  const exchange = 'US'

  // Use the symbol lookup hook (with debouncing and snackbar feedback built in)
  const { symbols, isLoading, isError, isSuccess, error } = useSymbolLookup(
    getTextFieldValue,
    exchange,
  )

  return (
    <Box sx={{ p: 2 }}>
      {/* The TextFieldComponent handles its own onChange using Redux */}
      <TextFieldComponent
        reduxId="symbolLookupSearch"
        label="Search Symbol"
        placeholder="Type a symbol, e.g., AAPL..."
      />

      {isLoading && (
        <Box sx={{ mt: 2, fontStyle: 'italic' }}>
          Loading symbols...
        </Box>
      )}

      {isError && (
        <Box sx={{ mt: 2, color: 'red' }}>
          Error: {(error as any)?.data?.message || 'Error fetching symbols'}
        </Box>
      )}

      {isSuccess && symbols && symbols.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <TableWrapperComponent
            data={symbols}
            enablePagination={true}
            rowsPerPage={5}
            gridlines={true}
            hoverHighlight={true}
            renderRow={(row) => (
              <>
                <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>
                  {row.symbol}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>
                  {row.displaySymbol}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>
                  {row.description}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>
                  {row.type}
                </TableCell>
              </>
            )}
            containerSx={{ border: '1px solid #ccc', borderRadius: 1 }}
          />
        </Box>
      )}
    </Box>
  )
}

export default LiveSearchSymbolLookup
