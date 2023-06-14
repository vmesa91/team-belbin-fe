import React, { useRef } from 'react'
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Card, CardHeader, Paper, Stack, Typography } from '@mui/material';
import Carousel , { CarouselArrows } from '../../../common/components/Carousel';

export const TeamCarouselMembers = ({ title, subheader, list, sx, ...other }) => {

  const theme = useTheme();

  const carouselRef = useRef(null);

  const carouselSettings = {
    dots: false,
    arrows: false,
    slidesToShow: list.length % 2 === 0 ? 4 : 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
     <Card sx={{ py: 2, px: 2 , ...sx }} {...other}>
        <CardHeader 
         title={title}
         subheader={subheader}
         action={<CarouselArrows onNext={handleNext} onPrevious={handlePrev} />}
            sx={{
            p: 0,
            mb: 3,
            '& .MuiCardHeader-action': { alignSelf: 'center' },
            }}
            />

        <Carousel ref={carouselRef} {...carouselSettings}>
            {list.map((item) => (
            <CarouselItem key={item._id} item={item} />
            ))}
      </Carousel>
     </Card>
  )
}

// ----------------------------------------------------------------------

const CarouselItem = ({ item }) => {

    const { user , profile , belbinRol, language} = item;
    const { name , surname, image } = user

    return (
        <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
            <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>

                        <Avatar src={image} alt="photoURL"/>
                        
                        <div>
                            <Typography variant="subtitle2">{name + ' ' + surname}</Typography>

                            <Typography
                            variant="caption"
                            sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}
                            >
                                {profile.name}
                            </Typography>
                            <Typography
                            variant="caption"
                            sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}
                            >
                                {language[0].name}
                            </Typography>
                        </div>
                </Stack>
            </Stack>
        </Paper>
    )

}