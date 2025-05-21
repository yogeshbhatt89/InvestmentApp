// LinearProgressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

interface LinearProgressState {
  [progressId: string]: {
    progress: number
    message: string
  }
}

interface LinearProgressPayload {
  progressId: string
  progress: number
  message: string
}

const initialState: LinearProgressState = {
  default: {
    progress: 0,
    message: '',
  },
}

const linearProgressSlice = createSlice({
  name: 'linearProgress',
  initialState,
  reducers: {
    setLinearProgress: (state, action: PayloadAction<LinearProgressPayload>) => {
      const { progressId, progress, message } = action.payload
      state[progressId] = { progress, message }
    },
  },
})

export const { setLinearProgress } = linearProgressSlice.actions
export const linearProgressReducer = linearProgressSlice.reducer

// Selector
export const selectLinearProgressState = (state: RootState, progressId: string) => {
  return state.linearProgress[progressId]
}
