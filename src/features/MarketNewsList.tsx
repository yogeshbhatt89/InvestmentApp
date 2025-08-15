// MarketNewsList.tsx
import React, { useState } from 'react'
import {
  ListWrapperComponent,
  ListItemComponent,
  ListItemIconComponent,
  ListItemTextComponent,
} from '@/modules/List'
import { useMarketNews } from '@/services/finnhub/useMarketNews'
import { Link } from 'react-router-dom'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import PaginationWrapperComponent from '@/modules/PaginationWrapperComponent'

interface MarketNewsListProps {
  category: string
  minId?: number
}

const MarketNewsList: React.FC<MarketNewsListProps> = ({ category, minId }) => {
  const { news } = useMarketNews(category, minId)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const handlePageChange = (_: any, value: number) => {
    setPage(value)
  }

  return (
    <div>
      <ListWrapperComponent>
        {news.slice((page - 1) * pageSize, page * pageSize).map((item, index) => (
          <Link
            to={item.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <CardWrapperComponent className="mb-4">
              <ListItemComponent className="border-b border-gray-200 hover:bg-gray-100 py-2">
                <ListItemIconComponent className="mr-4">
                  <img src={item.image} alt={item.headline} className="w-14 h-14" />
                </ListItemIconComponent>
                <ListItemTextComponent
                  primary={item.headline}
                  secondary={item.summary}
                  className="text-gray-600 hover:text-gray-900"
                />
              </ListItemComponent>
            </CardWrapperComponent>
          </Link>
        ))}
      </ListWrapperComponent>
      <PaginationWrapperComponent
        count={Math.ceil(news.length / pageSize)}
        page={page}
        onChange={handlePageChange}
        className="mt-4"
      />
    </div>
  )
}

export default MarketNewsList
