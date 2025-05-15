import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { updateChartType, updateChartData } from './ChartSlice'
import { createSelector } from '@reduxjs/toolkit'

type ReduxId = keyof RootState
const selectChartData = (state: RootState, reduxId: ReduxId) => state[reduxId]

const selectChartState = createSelector([selectChartData], (chartData: any) => ({
  chartType: chartData?.chartType,
  data: chartData?.data,
}))

export const useChart = (reduxId: string) => {
  const dispatch = useDispatch()
  const chartState = useSelector((state: RootState) => selectChartState(state, reduxId as ReduxId))

  const updateChart = (newChartType: 'line' | 'bar' | 'candlestick') => {
    dispatch(updateChartType({ reduxId, chartType: newChartType }))
  }

  const handleUpdateChartData = (newData: any[]) => {
    dispatch(updateChartData({ reduxId, data: newData }))
  }

  return {
    chartType: chartState.chartType,
    data: chartState.data,
    updateChart,
    handleUpdateChartData,
  }
}
