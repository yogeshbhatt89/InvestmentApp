import React from 'react'
import {
  TextField,
  TextFieldProps as MuiTextFieldProps,
  InputAdornment,
  IconButton,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
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
  onClear?: () => void
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
  onClear,
  ...muiProps
}) => {
  const { getTextFieldValue, setTextFieldValue } = useTextField(reduxId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(e.target.value)
  }

  return (
    <TextField
      {...muiProps}
      className={className}
      fullWidth={fullWidth}
      label={label}
      value={getTextFieldValue}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      InputProps={{
        endAdornment: getTextFieldValue ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search"
              onClick={() => {
                setTextFieldValue('')
                onClear?.()
              }}
              edge="end"
              size="small"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  )
}

export default TextFieldComponent
