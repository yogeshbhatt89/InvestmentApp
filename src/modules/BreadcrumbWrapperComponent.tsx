import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

interface BreadcrumbWrapperComponentProps {
  items: Array<{ label: string; onClick?: () => void }>
}

 const BreadcrumbWrapperComponent: React.FC<BreadcrumbWrapperComponentProps> = ({ items }) => (
  <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
    {items.map((item, _idx) =>
      item.onClick ? (
        <Link
          key={item.label}
          underline="hover"
          color="inherit"
          onClick={item.onClick}
          sx={{ cursor: 'pointer' }}
        >
          {item.label}
        </Link>
      ) : (
        <Typography key={item.label} color="text.primary">
          {item.label}
        </Typography>
      )
    )}
  </Breadcrumbs>
)

export default BreadcrumbWrapperComponent
