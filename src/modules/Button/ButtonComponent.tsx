import React from 'react'
import { Button, CircularProgress } from '@mui/material'
import useButton from './useButton'

interface ButtonProps {
  label?: string
  reduxId: string
  onClick?: () => void
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'inherit' | 'primary' | 'secondary' | 'error'
  disabled?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  fullWidth?: boolean
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  reduxId,
  onClick,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  startIcon,
  endIcon,
  className,
  fullWidth = false,
}) => {
  const { buttonState } = useButton(reduxId)

  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled || buttonState.disabled || buttonState.loading}
      startIcon={buttonState.loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      onClick={onClick}
      className={className}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  )
}

export default ButtonComponent
