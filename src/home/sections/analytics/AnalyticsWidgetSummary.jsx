
import { Card, Typography } from '@mui/material';
import { Iconify } from '../../../common/components/Iconify/Iconify'
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from '../../../common/utils/cssStyles';

export const AnalyticsWidgetSummary = ({   
    title,
    total,
    icon,
    color = 'primary',
    sx,
    ...other }) => {

    const theme = useTheme();
  return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: theme.palette[color].darker,
                bgcolor: theme.palette[color].lighter,
                ...sx,
            }}
            {...other}
        >
        <Iconify
                icon={icon}
                sx={{
                mb: 3,
                p: 2.5,
                width: 64,
                height: 64,
                borderRadius: '50%',
                color: theme.palette[color].dark,
                ...bgGradient({
                    direction: '135deg',
                    startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
                    endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
                }),
                }}
        />
            <Typography variant="h3">{total}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
                    {title}
            </Typography>
        </Card>
  )
}
