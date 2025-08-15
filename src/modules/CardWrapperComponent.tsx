import React from 'react'
import { Card } from '@mui/material'

interface CardWrapperComponentProps {
  children: React.ReactNode
  className?: string
}

const CardWrapperComponent: React.FC<CardWrapperComponentProps> = ({ children, className }) => {
  return <Card className={className}>{children}</Card>
}

export default CardWrapperComponent
