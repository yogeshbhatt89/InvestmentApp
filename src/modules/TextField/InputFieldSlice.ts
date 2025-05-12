import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InputFieldState {
  [key: string]: string
}

const initialState: InputFieldState = {}

const inputFieldSlice = createSlice({
  name: 'inputField',
  initialState,
  reducers: {
    updateInputValue: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload
      state[field] = value
    },
  },
})

export const { updateInputValue } = inputFieldSlice.actions
export const inputFieldReducer = inputFieldSlice.reducer
