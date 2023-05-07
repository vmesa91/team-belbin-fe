import SimpleBar from 'simplebar-react';
// @mui
import { alpha, styled } from '@mui/material/styles';

const StyledRootScrollbar = styled('div')(() => ({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
  }));


const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
maxHeight: '100%',
'& .simplebar-scrollbar': {
    '&:before': {
    backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
    opacity: 1,
    },
},
'& .simplebar-track.simplebar-vertical': {
    width: 10,
},
'& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
},
'& .simplebar-mask': {
    zIndex: 'inherit',
},
}));

// ----------------------------------------------------------------------

export const ScrollBar = ({ children, sx, ...other }) => {
  return (
    <StyledRootScrollbar>
        <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
            { children }
        </StyledScrollbar>
    </StyledRootScrollbar>
  )
}
