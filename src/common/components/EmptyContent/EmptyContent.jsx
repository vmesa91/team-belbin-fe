import { Stack, Typography } from '@mui/material'
import { Image } from '../Image/Image'

export const EmptyContent = ({ title, description, img, sx, ...other }) => {
  return (
    <Stack 
        alignItems="center"
        justifyContent="center"
        sx={{
        height: 1,
        textAlign: 'center',
        p: (theme) => theme.spacing(8, 2),
        ...sx,
        }}
        {...other}>
      <Image  
        disabledEffect
        alt="empty content"
        src={img || '/assets/illustrations/illustration_empty_content.svg'}
        sx={{ height: 240, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
            { title }  
      </Typography>  

      
      { description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
        </Typography>
      )}
    </Stack>
  )
}