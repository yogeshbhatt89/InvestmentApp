import React from 'react'
import { useRecommendationTrends, RecommendationTrend } from '@/services/finnhub/useRecommendationTrends'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import BoxComponent from '@/modules/BoxComponent'
import TypographyComponent from '@/modules/TypographyComponent'
import PaginationWrapperComponent from '@/modules/PaginationWrapperComponent'

interface CompanyRecommendationTrendSectionProps {
  symbol: string
}

const CompanyRecommendationTrendSection: React.FC<CompanyRecommendationTrendSectionProps> = ({ symbol }) => {
  const { data, isLoading, isError } = useRecommendationTrends(symbol)
  const [page, setPage] = React.useState(1)
  const pageSize = 5
  const totalDataCount = data?.data.length || 0;
  const handlePageChange = (_: any, value: number) => {
    setPage(value)
  }

  if (isLoading) {
    return (
      <CardWrapperComponent className="company-recommendation-trend-card">
        <BoxComponent sx={{ p: 2, opacity: 0.5 }}>
          <TypographyComponent variant="body1">
            Loading...
          </TypographyComponent>
        </BoxComponent>
      </CardWrapperComponent>
    );
  }

  if (isError) {
    return (
      <CardWrapperComponent className="company-recommendation-trend-card">
        <BoxComponent sx={{ p: 2 }}>
          <TypographyComponent variant="h6" sx={{ fontWeight: 'bold' }}>
            No Recommendation Trends for {symbol}
          </TypographyComponent>
        </BoxComponent>
      </CardWrapperComponent>
    );
  }

  return (
    <CardWrapperComponent className="company-recommendation-trend-card">
      <BoxComponent sx={{ p: 2 }}>
        <TypographyComponent variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Recommendation Trends
        </TypographyComponent>
        {data && data.data && data.data.slice((page - 1) * pageSize, page * pageSize).map((trend: RecommendationTrend) => (
          <CardWrapperComponent key={trend.period} className="recommendation-trend-card mb-2">
            <BoxComponent sx={{ p: 2 }}>
              <TypographyComponent variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {trend.period}
              </TypographyComponent>
              <TypographyComponent variant="body2">
                Buy: {trend.buy}
              </TypographyComponent>
              <TypographyComponent variant="body2">
                Hold: {trend.hold}
              </TypographyComponent>
              <TypographyComponent variant="body2">
                Sell: {trend.sell}
              </TypographyComponent>
              <TypographyComponent variant="body2">
                Strong Buy: {trend.strongBuy}
              </TypographyComponent>
              <TypographyComponent variant="body2">
                Strong Sell: {trend.strongSell}
              </TypographyComponent>
            </BoxComponent>
          </CardWrapperComponent>
        ))}
        {totalDataCount > 5 && <PaginationWrapperComponent
          count={Math.ceil(totalDataCount / pageSize)}
          page={page}
          onChange={handlePageChange}
          className="mt-4 mb-4"
          showFirstButton={true}
          showLastButton={true}
        />}
      </BoxComponent>
    </CardWrapperComponent>
  )
}

export default CompanyRecommendationTrendSection
