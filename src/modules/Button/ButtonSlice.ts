import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ButtonState {
  [key: string]: {
    disabled: boolean
    loading: boolean
  }
}

const initialState: ButtonState = {}

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    updateButtonDisabled(state, action: PayloadAction<{ buttonId: string; disabled: boolean }>) {
      state[action.payload.buttonId] = {
        ...state[action.payload.buttonId],
        disabled: action.payload.disabled,
      }
    },
    updateButtonLoading(state, action: PayloadAction<{ buttonId: string; loading: boolean }>) {
      state[action.payload.buttonId] = {
        ...state[action.payload.buttonId],
        loading: action.payload.loading,
      }
    },
  },
})

export const { updateButtonDisabled } = buttonSlice.actions

export const buttonReducer = buttonSlice.reducer
