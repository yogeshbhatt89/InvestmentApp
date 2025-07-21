import React from 'react'
import ButtonComponent from '@/modules/Button'
import ChartComponent, { useChart } from '@/modules/Chart'
import DropdownComponent from '@/modules/Dropdown/DropdownComponent'
import { useDropdown } from '@/modules/Dropdown/useDropdown'

const chartTypes = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
  { value: 'area', label: 'Area' },
  { value: 'scatter', label: 'Scatter' },
  { value: 'pie', label: 'Pie' },
  { value: 'radar', label: 'Radar' },
  { value: 'candlestick', label: 'Candlestick' },
]

const chartData = [10, 20, 30, 40, 50]

const candlestickData = [
  { x: '2023-01-01', y: [51.98, 56.29, 51.59, 53.85] },
  { x: '2023-01-02', y: [53.66, 54.99, 51.35, 52.95] },
  { x: '2023-01-03', y: [52.96, 53.78, 51.54, 52.48] },
  { x: '2023-01-04', y: [52.54, 52.79, 51.02, 51.94] },
  { x: '2023-01-05', y: [51.94, 53.11, 51.94, 52.64] },
]

const DemoChartComponent = () => {
  const { updateChart, handleUpdateChartData, data } = useChart('demo-chart')
  const { selectedValue: selectedChartType } = useDropdown('chart-type-dropdown')

  // Update chart type when dropdown changes
  React.useEffect(() => {
    if (selectedChartType) {
      updateChart(selectedChartType as any)
    }
    // eslint-disable-next-line
  }, [selectedChartType])

  // Set initial chart data
  React.useEffect(() => {
    if (selectedChartType === 'candlestick') {
      handleUpdateChartData(candlestickData)
    } else {
      handleUpdateChartData(chartData)
    }
    // eslint-disable-next-line
  }, [selectedChartType])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        <DropdownComponent
          reduxId="chart-type-dropdown"
          label="Chart Type"
          options={chartTypes}
          size="medium"
          fullWidth
        />
        <ButtonComponent
          label="Add data"
          reduxId="chart-data-button"
          onClick={() =>
            selectedChartType === 'candlestick'
              ? handleUpdateChartData(candlestickData)
              : handleUpdateChartData(chartData)
          }
          size="medium"
        />
        {data && data.length > 0 && (
          <ChartComponent
            reduxId="demo-chart"
            series={[
              {
                name: 'Series 1',
                data: data,
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}

export default DemoChartComponent
