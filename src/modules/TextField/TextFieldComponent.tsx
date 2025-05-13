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
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  reduxId,
  error = false,
  helperText = '',
  fullWidth = true,
  className,
}) => {
  const { getTextFieldValue, setTextFieldValue } = useTextField(reduxId)

  return (
    <TextField
      className={className}
      fullWidth={fullWidth}
      label={label}
      value={getTextFieldValue}
      onChange={e => setTextFieldValue(e.target.value)}
      error={error}
      helperText={helperText}
    />
  )
}

export default TextFieldComponent
