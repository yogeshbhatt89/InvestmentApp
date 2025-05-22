import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

interface BackdropItem {
  count: number
}

interface BackdropState {
  [backdropId: string]: BackdropItem
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
      if (state[backdropId]) {
        state[backdropId].count += 1
      } else {
        state[backdropId] = { count: 1 }
      }
    },
    hideBackdrop: (state, action: PayloadAction<BackdropPayload>) => {
      const { backdropId } = action.payload
      if (state[backdropId]) {
        state[backdropId].count -= 1
        // Ensure the count doesn't drop below zero.
        if (state[backdropId].count < 0) {
          state[backdropId].count = 0
        }
      }
    },
    // Optional: a reset action that clears the counter (if needed)
    resetBackdrop: (state, action: PayloadAction<BackdropPayload>) => {
      const { backdropId } = action.payload
      state[backdropId] = { count: 0 }
    },
  },
})

export const { showBackdrop, hideBackdrop, resetBackdrop } = backdropSlice.actions
export const backdropReducer = backdropSlice.reducer

// Selector returns true if the counter for the given backdropId is > 0.
export const selectBackdropState = (state: RootState, backdropId: string): boolean => {
  return (state.backdrop[backdropId]?.count ?? 0) > 0
}
