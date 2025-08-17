import React from 'react'
import { useMarketStatus } from '@/services/finnhub/useMarketStatus'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import BoxComponent from '@/modules/BoxComponent'
import TypographyComponent from '@/modules/TypographyComponent'

interface MarketStatusProps {
  exchange?: string
}

const MarketStatus: React.FC<MarketStatusProps> = ({ exchange = 'US' }) => {
  const { marketStatus, isLoading, isError } = useMarketStatus(exchange)

  return (
    <CardWrapperComponent className="market-status-card">
      <BoxComponent
        sx={{
          p: 2,
          minWidth: 200,
          position: 'relative',
          filter: isLoading ? 'blur(3px)' : 'none',
          transition: 'filter 0.3s',
        }}
      >
        <TypographyComponent variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Market Status ({exchange})
        </TypographyComponent>
        {isError && (
          <TypographyComponent variant="body2" color="error">
            Unable to fetch market status.
          </TypographyComponent>
        )}
        {marketStatus && (
          <>
            <TypographyComponent
              variant="body2"
              color={marketStatus.isOpen ? 'success.main' : 'error.main'}
            >
              {marketStatus.isOpen ? 'Open' : 'Closed'}
            </TypographyComponent>
            <TypographyComponent variant="caption" color="text.secondary">
              Timezone: {marketStatus.timezone}
            </TypographyComponent>
          </>
        )}
      </BoxComponent>
    </CardWrapperComponent>
  )
}

export default MarketStatus
