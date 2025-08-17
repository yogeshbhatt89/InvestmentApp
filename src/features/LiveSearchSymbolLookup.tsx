import React from 'react'
import TableWrapperComponent, { useTable } from '@/modules/Table'
import TextFieldComponent from '@/modules/TextField'
import { useSymbolLookup } from '@/services/finnhub/useSymbolLookup'
import { useBatchQuoteSearch } from '@/services/finnhub/useBatchQuoteSearch'
import { useTextField } from '@/modules/TextField'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import IconWrapper from '@/modules/Icon/IconWrapper'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import BoxComponent from '@/modules/BoxComponent'
import TypographyComponent from '@/modules/TypographyComponent'
interface LiveSearchSymbolLookupProps {
  onRowClick: (_symbol: string) => void
}

const LiveSearchSymbolLookup: React.FC<LiveSearchSymbolLookupProps> = ({ onRowClick }) => {
  const { getTextFieldValue, setTextFieldValue } = useTextField('symbolLookupSearch')
  const { symbols, isLoading, isError, isSuccess } = useSymbolLookup(getTextFieldValue, 'US')
  const {
    data: batchQuotes,
    isError: isBatchError,
    isFetching: isBatchFetching,
  } = useBatchQuoteSearch(symbols.map(symbol => symbol.symbol).join(','))
  const { clearData } = useTable()

  const handleClearSearch = () => {
    setTextFieldValue('')
    clearData()
  }

  return (
    <CardWrapperComponent className="mb-4">
      <Box sx={{ p: 2 }}>
        <TextFieldComponent
          reduxId="symbolLookupSearch"
          label="Search for Stocks"
          placeholder="Type a symbol, e.g., AAPL..."
          type="text"
          onClear={handleClearSearch}
        />
        {getTextFieldValue === '' && (
          <BoxComponent sx={{ mt: 2, mb: 2 }}>
            <TypographyComponent variant="body2" color="textSecondary">
              Search for stocks, ETFs, and indices by symbol or name.
            </TypographyComponent>
            <TypographyComponent variant="body2" color="textSecondary">
              Examples: AAPL, GOOG, MSFT, apple, google, microsoft
            </TypographyComponent>
          </BoxComponent>
        )}
        {isLoading && <Box sx={{ mt: 2, fontStyle: 'italic' }}>Loading symbols...</Box>}
        {isError && <Box sx={{ mt: 2, color: 'red' }}>No results</Box>}

        {isSuccess && getTextFieldValue && symbols.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <TableWrapperComponent
              key={getTextFieldValue}
              data={symbols}
              enablePagination={true}
              rowsPerPage={5}
              gridlines={true}
              hoverHighlight={true}
              isLoading={isBatchFetching}
              renderRow={row => {
                return (
                  <>
                    <TableCell
                      sx={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        ...(isBatchFetching ? { filter: 'blur(4px)', pointerEvents: 'none' } : {}),
                        cursor: 'pointer',
                      }}
                      onClick={() => onRowClick(row.symbol)}
                    >
                      {row.symbol}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        ...(isBatchFetching ? { filter: 'blur(4px)', pointerEvents: 'none' } : {}),
                        cursor: 'pointer',
                      }}
                      onClick={() => onRowClick(row.symbol)}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        ...(isBatchFetching ? { filter: 'blur(4px)', pointerEvents: 'none' } : {}),
                        cursor: 'pointer',
                      }}
                      onClick={() => onRowClick(row.symbol)}
                    >
                      {isBatchFetching ? (
                        <span>Loading...</span>
                      ) : isBatchError ? (
                        <span>Error</span>
                      ) : (
                        (() => {
                          const quote = batchQuotes?.find((q: any) => q.symbol === row.symbol)
                          if (!quote) return <span>N/A</span>
                          const isProfit = quote.data.priceChange > 0
                          const isLoss = quote.data.priceChange < 0
                          return (
                            <span>
                              ${quote.data.currentPrice}
                              {isProfit && (
                                <IconWrapper
                                  name="ArrowUpward"
                                  color="success"
                                  size={18}
                                  sx={{ verticalAlign: 'middle' }}
                                />
                              )}
                              {isLoss && (
                                <IconWrapper
                                  name="ArrowDownward"
                                  color="error"
                                  size={18}
                                  sx={{ verticalAlign: 'middle' }}
                                />
                              )}
                            </span>
                          )
                        })()
                      )}
                    </TableCell>
                  </>
                )
              }}
              containerSx={{ border: '1px solid #ccc', borderRadius: 1 }}
            />
          </Box>
        )}
      </Box>
    </CardWrapperComponent>
  )
}

export default LiveSearchSymbolLookup
