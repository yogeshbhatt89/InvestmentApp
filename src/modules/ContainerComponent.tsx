import React from 'react'
import { Container, ContainerProps } from '@mui/material'

interface CustomContainerProps extends ContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * A reusable wrapper around MUI's Container with default maxWidth and padding.
 */
const ContainerComponent: React.FC<CustomContainerProps> = ({
  children,
  className,
  maxWidth = 'sm',
  ...rest
}) => {
  return (
    <Container maxWidth={maxWidth} className={className} {...rest}>
      {children}
    </Container>
  )
}

export default ContainerComponent
