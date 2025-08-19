import React from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText,
  CircularProgress,
} from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { useDropdown } from './useDropdown'

export interface DropdownOption {
  value: string | number
  label: string
  icon?: React.ReactElement
  disabled?: boolean
}

interface DropdownComponentProps {
  reduxId: string
  label: string
  options: DropdownOption[]
  variant?: 'standard' | 'outlined' | 'filled'
  size?: 'small' | 'medium'
  error?: boolean
  helperText?: string
  required?: boolean
  fullWidth?: boolean
  className?: string
  multiple?: boolean
  disabled?: boolean
  sx?: SxProps<Theme>
  isLoading?: boolean
  onBlur?: () => void
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  reduxId,
  label,
  options,
  variant = 'outlined',
  size = 'medium',
  error = false,
  helperText,
  required = false,
  fullWidth = true,
  className = '',
  multiple = false,
  disabled = false,
  sx,
  isLoading = false,
  onBlur,
}) => {
  const { selectedValue, setValue } = useDropdown(reduxId, multiple)

  // Value is already properly typed from the hook based on multiple prop
  const value = selectedValue || (multiple ? [] : '')

  const handleChange = (e: SelectChangeEvent<typeof value>) => {
    setValue(e.target.value)
  }

  return (
    <FormControl
      variant={variant}
      size={size}
      error={error}
      required={required}
      fullWidth={fullWidth}
      className={className}
      sx={sx}
    >
      <InputLabel id={`${reduxId}-label`}>{label}</InputLabel>
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          labelId={`${reduxId}-label`}
          id={reduxId}
          value={value}
          label={label}
          onChange={handleChange}
          disabled={disabled || isLoading}
          multiple={multiple}
          onBlur={onBlur}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default DropdownComponent
