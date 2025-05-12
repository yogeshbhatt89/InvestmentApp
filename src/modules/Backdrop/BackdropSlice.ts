import { createSlice } from '@reduxjs/toolkit'

interface BackdropState {
  [backdropId: string]: {
    open: boolean
  }
}

const initialState: BackdropState = {}

const backdropSlice = createSlice({
  name: 'backdrop',
  initialState,
  reducers: {
    showUi(state, action) {
      state[action.payload.backdropId] = { ...state[action.payload.backdropId], open: true }
    },
    hideUi(state, action) {
      state[action.payload.backdropId] = { ...state[action.payload.backdropId], open: false }
    },
  },
})

export const { showUi, hideUi } = backdropSlice.actions
export const backdropReducer = backdropSlice.reducer
