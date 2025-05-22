import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

interface LinearProgressState {
  [progressId: string]: {
    message: string
  }
}

interface LinearProgressPayload {
  progressId: string
  message: string
}

const initialState: LinearProgressState = {
  default: {
    message: '',
  },
}

const linearProgressSlice = createSlice({
  name: 'linearProgress',
  initialState,
  reducers: {
    setLinearProgress: (state, action: PayloadAction<LinearProgressPayload>) => {
      const { progressId, message } = action.payload
      state[progressId] = { message }
    },
  },
})

export const { setLinearProgress } = linearProgressSlice.actions
export const linearProgressReducer = linearProgressSlice.reducer

// Selector
export const selectLinearProgressState = (state: RootState, progressId: string) => {
  return state.linearProgress[progressId]
}
