import React from 'react'
import { useQuoteSearch } from '@/services/finnhub/useQuoteSearch'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import BoxComponent from '@/modules/BoxComponent'
import TypographyComponent from '@/modules/TypographyComponent'

interface CompanyQuoteSectionProps {
  symbol: string
}

const CompanyQuoteSection: React.FC<CompanyQuoteSectionProps> = ({ symbol }) => {
  const { quote, isLoading, isError } = useQuoteSearch(symbol)

  const getPriceChangeColor = () => {
    if (quote.priceChange > 0) {
      return 'success'
    } else if (quote.priceChange < 0) {
      return 'error'
    } else {
      return 'textSecondary'
    }
  }

  return (
    <CardWrapperComponent className="company-quote-card">
      <BoxComponent sx={{ p: 2 }}>
        <TypographyComponent variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          {symbol} Information
        </TypographyComponent>
        {isLoading && <TypographyComponent variant="body2">Loading...</TypographyComponent>}
        {isError && (
          <TypographyComponent variant="body2" color="error">
            Unable to fetch quote information.
          </TypographyComponent>
        )}
        {quote && (
          <>
            <TypographyComponent variant="body2">
              Current Price: ${quote.currentPrice.toLocaleString()}
            </TypographyComponent>
            <TypographyComponent variant="body2" color={getPriceChangeColor()}>
              Price Change: {quote.priceChange > 0 ? '+' : ''}${quote.priceChange.toLocaleString()}
            </TypographyComponent>
            <TypographyComponent variant="body2" color={getPriceChangeColor()}>
              Percent Change: {quote.percentChange.toFixed(2)}%
            </TypographyComponent>
            <TypographyComponent variant="body2">
              High Price: ${quote.highPrice.toLocaleString()}
            </TypographyComponent>
            <TypographyComponent variant="body2">
              Low Price: ${quote.lowPrice.toLocaleString()}
            </TypographyComponent>
          </>
        )}
      </BoxComponent>
    </CardWrapperComponent>
  )
}

export default CompanyQuoteSection
