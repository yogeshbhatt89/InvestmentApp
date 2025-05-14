import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

interface BackdropState {
  [backdropId: string]: {
    open: boolean
  }
}

interface BackdropPayload {
  backdropId: string
}

const initialState: BackdropState = {}

const backdropSlice = createSlice({
  name: 'backdrop',
  initialState,
  reducers: {
    showBackdrop: (state, action: PayloadAction<BackdropPayload>) => {
      const { backdropId } = action.payload
      state[backdropId] = { open: true }
    },
    hideBackdrop: (state, action: PayloadAction<BackdropPayload>) => {
      const { backdropId } = action.payload
      state[backdropId] = { open: false }
    },
  },
})

export const { showBackdrop, hideBackdrop } = backdropSlice.actions
export const backdropReducer = backdropSlice.reducer

// Selector
export const selectBackdropState = (state: RootState, backdropId: string): boolean => {
  return state.backdrop[backdropId]?.open ?? false
}
