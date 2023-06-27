// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Stack, Divider, CardHeader, Typography } from '@mui/material';

// components
import Chart, { useChart } from '../../../common/components/Chart';

// ----------------------------------------------------------------------

const StyledRoot = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%',
    },
  },
  '& .apexcharts-datalabels-group': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function TeamSympathySummary({ title, total, subheader, chart, ...other }) {
  const theme = useTheme();


  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    fill: { opacity: 0.8 },
    legend: {
      position: 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left',
          },
        },
      },
    ],
    ...options,
  });

  return (
    <StyledRoot {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ my: 5 }} dir="ltr">
        <Chart
          type="polarArea"
          series={chartSeries}
          options={chartOptions}
          height={240}
        />
      </Box>

      <Divider />

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            Miembros
          </Typography>

          <Typography sx={{ typography: 'h4' }}> {total} </Typography>
        </Box>
      </Stack>
    </StyledRoot>
  );
}
