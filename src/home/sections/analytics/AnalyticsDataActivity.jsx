
import Chart, { useChart } from '../../../common/components/Chart';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
import { CustomSmallSelect } from '../../../common/components/Form/CustomSmallSelect';

export const AnalyticsDataActivity = ({ title, subheader, chart, ...other }) => {
    
    const { labels, colors, series, options } = chart;
    const [seriesData, setSeriesData] = useState('Week');

    const chartOptions = useChart({
        chart: {
          stacked: true,
        },
        colors,
        stroke: {
          width: 0,
        },
        xaxis: {
          categories:
            (seriesData === 'Week' && labels.week) ||
            (seriesData === 'Month' && labels.month) ||
            labels.year,
        },
        tooltip: {
          y: {
            formatter: (value) => fData(value),
          },
        },
        plotOptions: {
          bar: {
            borderRadius: (seriesData === 'Week' && 8) || (seriesData === 'Month' && 6) || 10,
            columnWidth: '20%',
          },
        },
        ...options,
      });
    

  return (
        <Card {...other}>
            <CardHeader
            title={title}
            subheader={subheader}
            action={
                <CustomSmallSelect
                value={seriesData}
                onChange={(event) => setSeriesData(event.target.value)}
                >
                {series.map((option) => (
                    <option key={option.type} value={option.type}>
                    {option.type}
                    </option>
                ))}
                </CustomSmallSelect>
            }
            />

            {series.map((item) => (
            <Box key={item.type} sx={{ mt: 3, mx: 3 }} dir="ltr">
                {item.type === seriesData && (
                <Chart type="bar" series={item.data} options={chartOptions} height={364} />
                )}
            </Box>
        ))}
    </Card>
  )
}
