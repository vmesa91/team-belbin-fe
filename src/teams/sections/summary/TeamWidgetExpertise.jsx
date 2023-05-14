import { Box, Card, CardHeader, LinearProgress, Stack, Typography, alpha } from "@mui/material"


export const TeamWidgetExpertise = ({ title, subheader, data, ...other }) => {
  return (
    <Card { ...other }>
        <CardHeader  title={title} subheader={subheader} />

        <Stack spacing={3} sx={{ px: 3, my: 5 }}>
            { data.map(( value ) => (
                <LinearProgress 
                    variant="determinate"
                    key={value.expertise}
                    value={value.value}
                    color={
                        (value.value === '3' && 'warning') ||
                        (value.value === '2' && 'error') ||
                        'success'
                      }

                    sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
                />
            ))}
        </Stack> 

       <Stack direction="row" justifyContent="space-between" sx={{ px: 3, pb: 3 }}>
            { data.map(( value ) => (
                <Stack key={value.expertise} alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Box
                        sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 0.5,
                        bgcolor: 'success.main',
                        ...(value.value === '3' && { bgcolor: 'warning.main' }),
                        ...(value.value === '2' && { bgcolor: 'error.main' }),
                        }}
                    />
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            {value.expertise}
                    </Typography>
                    </Stack>
                </Stack>
            ))}
       </Stack>
    </Card>
  )
}
