import React from 'react'
import { TextField, TextFieldProps as MuiTextFieldProps } from '@mui/material'
import { useTextField } from './useTextField'

// Omit props that we want to control or modify
type OmittedProps = 'onChange' | 'name' | 'value'

interface TextFieldComponentProps extends Omit<MuiTextFieldProps, OmittedProps> {
  label: string
  reduxId: string
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  className?: string
  disabled?: boolean
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  reduxId,
  error = false,
  helperText = '',
  fullWidth = true,
  className,
  disabled = false,
  placeholder,
  type = 'text',
  ...muiProps
}) => {
  const { getTextFieldValue, setTextFieldValue } = useTextField(reduxId)

  return (
    <TextField
      {...muiProps}
      className={className}
      fullWidth={fullWidth}
      label={label}
      value={getTextFieldValue}
      onChange={e => setTextFieldValue(e.target.value)}
      error={error}
      helperText={helperText}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
    />
  )
}

export default TextFieldComponent
