import React from 'react'
import { TextField } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store' // You’ll need this

// --- 1. Redux Slice ---
interface FormState {
  [key: string]: string
}

const initialState: FormState = {}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateInputValue: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload
      state[field] = value
    },
  },
})

export const { updateInputValue } = formSlice.actions
export const formReducer = formSlice.reducer

// --- 2. Hook (get + update value) ---
export const useTextField = (field: string) => {
  const dispatch = useDispatch()
  const value = useSelector((state: RootState) => state.form[field] || '')

  const setValue = (val: string) => {
    dispatch(updateInputValue({ field, value: val }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return { value, setValue, handleChange }
}

interface TextFieldComponentProps {
  label: string
  name: string
  type?: string
  error?: boolean
  helperText?: string
  value: string
  fullWidth?: boolean
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
}

export const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  name,
  type = 'text',
  error = false,
  helperText = '',
  value,
  fullWidth = false,
  className,
  onChange,
  autoComplete,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      className={`w-72 ${className}`}
      autoComplete={autoComplete}
    />
  )
}

export default TextFieldComponent
