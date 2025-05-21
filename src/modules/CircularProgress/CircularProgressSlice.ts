import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BackdropState {
  progress: number
  message: string
}

const initialState: BackdropState = {
  progress: 0,
  message: '',
}

const backdropSlice = createSlice({
  name: 'backdrop',
  initialState,
  reducers: {
    setBackdropProgress(state, action: PayloadAction<{ progress: number; message: string }>) {
      state.progress = action.payload.progress
      state.message = action.payload.message
    },
    resetBackdrop(state) {
      state.progress = 0
      state.message = ''
    },
  },
})

export const { setBackdropProgress, resetBackdrop } = backdropSlice.actions
export const circularProgressReducer = backdropSlice.reducer
