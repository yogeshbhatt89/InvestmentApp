import React from 'react'
import { Button } from '@mui/material'
import useButton from './useButton'

interface ButtonProps {
  label?: string
  reduxId: string
  onClick?: () => void // The click handler
  type?: 'button' | 'submit' | 'reset' // Type for the button
  variant?: 'text' | 'outlined' | 'contained' // Variant type for the button
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' // Color of the button
  size?: 'small' | 'medium' | 'large' // Size of the button
  fullWidth?: boolean // Option to make the button full width
  disabled?: boolean // Option to disable the button
  disableElevation?: boolean // Option to disable elevation effect
  disableFocusRipple?: boolean // Option to disable focus ripple effect
  disableRipple?: boolean // Option to disable ripple effect
  endIcon?: React.ReactNode // Icon to display at the end of the button
  startIcon?: React.ReactNode // Icon to display at the start of the button
  onMouseDown?: () => void // Callback for mouse down event
  onMouseLeave?: () => void // Callback for mouse leave event
  onMouseUp?: () => void // Callback for mouse up event
  sx?: object // Custom styles for the button
  className?: string
  disabledState?: boolean
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  reduxId,
  onClick,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled,
  disableElevation,
  disableFocusRipple,
  disableRipple,
  endIcon,
  startIcon,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
  sx,
  className,
  disabledState,
}) => {
  const { buttonState, handleDisabledChange } = useButton(reduxId)

  const handleButtonClick = () => {
    if (onClick) {
      onClick()
    }
  }

  React.useEffect(() => {
    if (disabledState !== undefined) {
      handleDisabledChange(disabledState)
    }
  }, [disabledState, handleDisabledChange])

  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled !== undefined ? disabled : buttonState.disabled}
      disableElevation={disableElevation}
      disableFocusRipple={disableFocusRipple}
      disableRipple={disableRipple}
      endIcon={endIcon}
      startIcon={startIcon}
      onClick={handleButtonClick}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      sx={sx}
      className={`w-72 ${className}`}
    >
      {label}
    </Button>
  )
}

export default ButtonComponent
