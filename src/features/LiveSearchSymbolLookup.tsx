import React from 'react';
import TableWrapperComponent from '@/modules/Table';
import TextFieldComponent from '@/modules/TextField';
import { useSymbolLookup } from '@/services/finnhub/useSymbolLookup';
import { useBatchQuoteSearch } from '@/services/finnhub/useBatchQuoteSearch';
import { useTextField } from '@/modules/TextField';
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import IconWrapper from '@/modules/Icon/IconWrapper'
const LiveSearchSymbolLookup: React.FC = () => {
  const { getTextFieldValue } = useTextField('symbolLookupSearch')
  const exchange = 'US'

  const [pageNumber, setPageNumber] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { symbols, isLoading, isError, isSuccess, error } = useSymbolLookup(
    getTextFieldValue,
    exchange,
  );

  const displayedSymbols = isSuccess
    ? symbols.slice(pageNumber * rowsPerPage, pageNumber * rowsPerPage + rowsPerPage)
    : [];

  const { data: batchQuotes, isLoading: isBatchLoading, isError: isBatchError } = useBatchQuoteSearch(
    displayedSymbols.map((symbol) => symbol.symbol).join(',')
  );

  return (
    <Box sx={{ p: 2 }}>
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
          Error: {(error as any)?.error?.message || 'Error fetching symbols'}
        </Box>
      )}

      {isSuccess && symbols.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <TableWrapperComponent
            data={symbols}
            enablePagination={true}
            rowsPerPage={rowsPerPage}
            gridlines={true}
            hoverHighlight={true}
            onPageChange={(pageNumber) => setPageNumber(pageNumber)}
            onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            isLoading={isBatchLoading}
            renderRow={(row) => {
              return (
                <>
                  <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>
                    {row.symbol}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>
                    {row.description}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>
                    {isBatchLoading ? (
                      <span>Loading...</span>
                    ) : isBatchError ? (
                      <span>Error</span>
                    ) : (
                      (() => {
                        const quote = batchQuotes?.find((q: any) => q.symbol === row.symbol);
                        if (!quote) return <span>N/A</span>;
                        const isProfit = quote.data.priceChange > 0;
                        const isLoss = quote.data.priceChange < 0;
                        return (
                          <span>
                            ${quote.data.currentPrice}
                            {isProfit && (
                              <IconWrapper name="ArrowUpward" color="success" size={18} sx={{ verticalAlign: 'middle' }} />
                            )}
                            {isLoss && (
                              <IconWrapper name="ArrowDownward" color="error" size={18} sx={{ verticalAlign: 'middle' }} />

                            )}
                          </span>
                        );
                      })()
                    )}
                  </TableCell>
                </>
              );
            }}
            containerSx={{ border: '1px solid #ccc', borderRadius: 1 }}
          />
        </Box>
      )}
    </Box>
  )
}

export default LiveSearchSymbolLookup
