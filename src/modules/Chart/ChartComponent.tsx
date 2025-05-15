import React from 'react';
import { LineChart, LineSeriesType, BarChart, BarSeriesType } from '@mui/x-charts';
import { useChart } from './useChart';

interface ChartProps {
  reduxId: string;
  chartType: 'line' | 'bar';
  series: {
    type: string;
    name: string;
    data: { x: number; y: number; }[];
  }[];
  lineChartProps: {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number; };
  };
  barChartProps: {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number; };
  };
}

const ChartComponent: React.FC<ChartProps> = ({
  reduxId,
  chartType,
  series,
  lineChartProps,
  barChartProps,
}) => {
  const { data } = useChart(reduxId);

  return (
    <div>
      {chartType === 'line' ? (
        <LineChart
          series={series.map((s) => ({ ...s, data })) as LineSeriesType[]}
          {...lineChartProps}
        />
      ) : (
        <BarChart
          series={series.map((s) => ({ ...s, data })) as BarSeriesType[]}
          {...barChartProps}
        />
      )}
    </div>
  );
};

export default ChartComponent;
