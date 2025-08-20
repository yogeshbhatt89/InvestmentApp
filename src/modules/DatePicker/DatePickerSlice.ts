import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface DatePickerState {
  [reduxId: string]: {
    date: string | null
    isOpen: boolean
  }
}

const initialState: DatePickerState = {}

const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState,
  reducers: {
    setDate(state, action) {
      const { reduxId, date } = action.payload
      state[reduxId] = state[reduxId] || { date: null, isOpen: false }
      state[reduxId].date = date
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
