import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DatePickerState {
  [reduxId: string]: {
    date: Date | null
    isOpen: boolean
  }
}

const initialState: DatePickerState = {}

const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<{ reduxId: string; date: Date | null }>) {
      state[action.payload.reduxId] = {
        ...state[action.payload.reduxId],
        date: action.payload.date,
      }
    },
    setIsOpen(state, action: PayloadAction<{ reduxId: string; isOpen: boolean }>) {
      state[action.payload.reduxId] = {
        ...state[action.payload.reduxId],
        isOpen: action.payload.isOpen,
      }
    },
  },
})

export const { setDate, setIsOpen } = datePickerSlice.actions
export const datePickerReducer = datePickerSlice.reducer
