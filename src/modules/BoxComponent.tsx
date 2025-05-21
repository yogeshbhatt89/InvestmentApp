import React from 'react'
import { Box, BoxProps } from '@mui/material'

interface BoxComponentProps extends BoxProps {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

const BoxComponent: React.FC<BoxComponentProps> = ({ children, className, ...props }) => {
  return (
    <Box {...props} className={`${className} ${props.className}`}>
      {children}
    </Box>
  )
}

export default BoxComponent
