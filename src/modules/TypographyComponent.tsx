import React from 'react'
import { Typography, TypographyProps } from '@mui/material'

interface TypographyComponentProps extends TypographyProps {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

const TypographyComponent: React.FC<TypographyComponentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Typography {...props} className={`${className} ${props.className}`}>
      {children}
    </Typography>
  )
}

export default TypographyComponent
