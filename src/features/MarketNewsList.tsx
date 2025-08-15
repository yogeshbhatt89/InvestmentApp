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
import TypographyComponent from '@/modules/TypographyComponent'

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
    <CardWrapperComponent className="mb-4">
      <TypographyComponent
        variant="h2"
        className=" text-lg font-bold text-center flex justify-center items-center mt-4 mb-4"
      >
        Top Stories
      </TypographyComponent>
      <ListWrapperComponent>
        {news.slice((page - 1) * pageSize, page * pageSize).map((item, index) => (
          <Link
            to={item.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <ListItemComponent className="border-b border-gray-200 hover:bg-gray-100 py-2">
              <ListItemIconComponent className="mr-4">
                <img src={item.image} alt={item.headline} className="w-14 h-14" />
              </ListItemIconComponent>
              <ListItemTextComponent
                primary={item.headline}
                secondary={''}
                className="text-gray-600 hover:text-gray-900"
              />
            </ListItemComponent>
          </Link>
        ))}
      </ListWrapperComponent>
      <PaginationWrapperComponent
        count={Math.ceil(news.length / pageSize)}
        page={page}
        onChange={handlePageChange}
        className="mt-4 mb-4"
      />
    </CardWrapperComponent>
  )
}

export default MarketNewsList
