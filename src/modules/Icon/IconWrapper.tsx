import React from 'react'
import { SvgIconProps } from '@mui/material'
import { Icons, IconName } from './icons'

interface IconWrapperProps extends Omit<SvgIconProps, 'children'> {
  name: IconName
  size?: 'small' | 'medium' | 'large' | number
  color?: SvgIconProps['color']
  className?: string
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  name,
  size = 'medium',
  color = 'inherit',
  className = '',
  ...props
}) => {
  // Convert size string to number
  const sizeMap = {
    small: 20,
    medium: 24,
    large: 32,
  }

  const fontSize = typeof size === 'string' ? sizeMap[size] : size
  const Icon = Icons[name]

  return (
    <Icon
      {...props}
      color={color}
      className={className}
      sx={{
        fontSize,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.sx,
      }}
    />
  )
}

export default IconWrapper
