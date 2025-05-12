import React from 'react'
import { TextField } from '@mui/material'
import { useTextField } from './useTextField'

interface TextFieldComponentProps {
  label: string
  reduxId: string
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  className?: string
  autoComplete?: string
  placeholder?: string
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  reduxId,
  error = false,
  helperText = '',
  fullWidth = false,
  className,
  autoComplete,
  placeholder,
}) => {
  const { getTextFieldValue, setTextFieldValue } = useTextField(reduxId)

  return (
    <TextField
      slotProps={{
        root: {
          className,
        },
        input: {
          className,
        },
      }}
      fullWidth={fullWidth}
      label={label}
      value={getTextFieldValue}
      onChange={e => setTextFieldValue(e.target.value)}
      error={error}
      helperText={helperText}
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  )
}

export default TextFieldComponent
