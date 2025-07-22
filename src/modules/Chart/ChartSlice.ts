import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChartState {
  [reduxId: string]: {
    chartType: 'line' | 'bar' | 'candlestick'
    data: any[]
  }
}

const initialState: ChartState = {}

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    updateChartType(
      state,
      action: PayloadAction<{ reduxId: string; chartType: 'line' | 'bar' | 'candlestick' }>,
    ) {
      const { reduxId, chartType } = action.payload
      if (!state[reduxId]) {
        state[reduxId] = { chartType: 'line', data: [] }
      }
      state[reduxId].chartType = chartType
    },
    updateChartData(state, action: PayloadAction<{ reduxId: string; data: any[] }>) {
      const { reduxId, data } = action.payload
      if (!state[reduxId]) {
        state[reduxId] = { chartType: 'line', data: [] }
      }
      state[reduxId].data = data
    },
  },
})

export const { updateChartType, updateChartData } = chartSlice.actions
export const chartReducer = chartSlice.reducer
