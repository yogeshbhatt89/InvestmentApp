import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InputFieldState {
  [key: string]: string
}

interface UpdateInputPayload {
  field: string
  value: string | number
}

const initialState: InputFieldState = {}

const inputFieldSlice = createSlice({
  name: 'inputField',
  initialState,
  reducers: {
    updateInputValue: (state, action: PayloadAction<UpdateInputPayload>) => {
      const { field, value } = action.payload
      // Handle both string and number values
      if (field) {
        if (typeof value === 'number') {
          state[field] = value.toString()
        } else if (typeof value === 'string') {
          state[field] = value
        }
      }
    },
    clearInputValue: (state, action: PayloadAction<string>) => {
      const field = action.payload
      if (field in state) {
        delete state[field]
      }
    },
    clearAllInputs: () => initialState,
  },
})

export const { updateInputValue, clearInputValue, clearAllInputs } = inputFieldSlice.actions
export const inputFieldReducer = inputFieldSlice.reducer

// Selector
export const selectInputValue = (state: { textField: InputFieldState }, field: string): string =>
  state.textField[field] || ''
