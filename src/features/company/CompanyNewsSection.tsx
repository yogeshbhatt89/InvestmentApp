import React, { useState } from 'react'
import {
  ListWrapperComponent,
  ListItemComponent,
  ListItemIconComponent,
  ListItemTextComponent,
} from '@/modules/List'
import { useCompanyNews } from '@/services/finnhub/useCompanyNews'
import { Link } from 'react-router-dom'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import PaginationWrapperComponent from '@/modules/PaginationWrapperComponent'
import TypographyComponent from '@/modules/TypographyComponent'

interface CompanyNewsSectionProps {
  symbol: string
  from: string
  to: string
}

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ symbol, from, to }) => {
  const { news } = useCompanyNews(symbol, from, to)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const handlePageChange = (_: any, value: number) => {
    setPage(value)
  }

  if (news.length === 0) {
    return (
      <CardWrapperComponent className="mb-4">
        <TypographyComponent
          variant="h2"
          className="text-lg font-bold text-center flex justify-center items-center mt-4 mb-4"
        >
          No company news
        </TypographyComponent>
      </CardWrapperComponent>
    )
  }

  return (
    <CardWrapperComponent className="mb-4">
      <TypographyComponent
        variant="h2"
        className="text-lg font-bold text-center flex justify-center items-center mt-4 mb-4"
      >
        Company News
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
                <img src={item.image} alt={item.headline} className="w-24 h-14" />
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
        showFirstButton={true}
        showLastButton={true}
      />
    </CardWrapperComponent>
  )
}

export default CompanyNewsSection
