import { useRecommendationTrendsQuery } from '@/services/api'

export interface RecommendationTrend {
  buy: number
  hold: number
  period: string
  sell: number
  strongBuy: number
  strongSell: number
  symbol: string
}

export interface RecommendationTrendsResponse {
  success: {
    code: number
    message: string
    details: string
  }
  data: RecommendationTrend[]
  timestamp: number
}

export const useRecommendationTrends = (ticker: string) => {
  const { data, isLoading, isError } = useRecommendationTrendsQuery({ ticker })

  return { data, isLoading, isError }
}
