import { createSlice } from '@reduxjs/toolkit'

interface ApiCallTrackerState {
  apiCalls: {
    [key: string]: {
      status: 'pending' | 'success' | 'error' | 'idle'
      progress: number
    }
  }
}

const initialState: ApiCallTrackerState = {
  apiCalls: {},
}

const apiCallTrackerSlice = createSlice({
  name: 'apiCallTracker',
  initialState,
  reducers: {
    initializeApiCall(state, action) {
      state.apiCalls[action.payload.apiCallId] = {
        status: 'idle',
        progress: 0,
      }
    },
    startApiCall(state, action) {
      state.apiCalls[action.payload.apiCallId].status = 'pending'
    },
    updateApiCallProgress(state, action) {
      state.apiCalls[action.payload.apiCallId].progress = action.payload.progress
    },
    endApiCall(state, action) {
      state.apiCalls[action.payload.apiCallId].status = action.payload.status
    },
    resetApiCallProgress(state, action) {
      if (state.apiCalls[action.payload.apiCallId]) {
        state.apiCalls[action.payload.apiCallId].progress = 0
        state.apiCalls[action.payload.apiCallId].status = 'idle'
      }
    },
    updateApiCallStatus(state, action) {
      state.apiCalls[action.payload.apiCallId].status = action.payload.status
    },
  },
})

export const apiCallTrackerReducer = apiCallTrackerSlice.reducer
export const apiCallTrackerActions = apiCallTrackerSlice.actions
