import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useChart } from './useChart'

interface ChartProps {
  reduxId: string
  series: {
    name: string
    data: any[]
  }[]
  chartOptions?: any
  height?: number
  width?: number
}

const ChartComponent: React.FC<ChartProps> = ({
  reduxId,
  series,
  chartOptions = {},
  height = 600,
  width = 800,
}) => {
  const { chartType, data } = useChart(reduxId)

  const chartSeries = series.map(s => ({
    ...s,
    data: data && data.length > 0 ? data : s.data,
  }))

  return (
    <div>
      <ReactApexChart
        key={chartType}
        type={chartType}
        series={chartSeries}
        options={chartOptions}
        height={height}
        width={width}
      />
    </div>
  )
}

export default ChartComponent
