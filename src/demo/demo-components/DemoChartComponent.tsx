import React from 'react';
import ButtonComponent from '@/modules/Button';

import ChartComponent, { useChart } from '@/modules/Chart';

const DemoChartComponent = () => {
  const { updateChart, handleUpdateChartData } = useChart('demo-chart');
  const [chartType, setChartType] = React.useState('line');
  const chartData = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 30 },
    { x: 4, y: 40 },
    { x: 5, y: 50 },
  ];

  const handleChartTypeChange = () => {
    setChartType(chartType === 'line' ? 'bar' : 'line');
    const newChartType = chartType === 'line' ? 'bar' : 'line';
    if (newChartType === 'line' || newChartType === 'bar' || newChartType === 'candlestick') {
      updateChart(newChartType);
    } else {
      console.error('Invalid chart type');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <ButtonComponent
          label="Switch chart type"
          reduxId="chart-type-button"
          onClick={handleChartTypeChange}
          size="medium"
        />
        <ButtonComponent
          label="Add data"
          reduxId="chart-data-button"
          onClick={() => handleUpdateChartData(chartData)}
          size="medium"
        />
        <ChartComponent
          reduxId="demo-chart"
          chartType={chartType as 'line' | 'bar'}
          series={[
            {
              type: chartType,
              name: 'Series 1',
              data: chartData,
            },
          ]}
          lineChartProps={{
            width: 800,
            height: 600,
            margin: { top: 20, right: 20, bottom: 20, left: 20 },
          }}
          barChartProps={{
            width: 800,
            height: 600,
            margin: { top: 20, right: 20, bottom: 20, left: 20 },
          }}
        />
      </div>
    </div>
  );
};

export default DemoChartComponent;
