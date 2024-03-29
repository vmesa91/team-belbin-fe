import styled from "@emotion/styled";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";
import { Iconify } from "../Iconify/Iconify";

// utils
import { bgBlur } from '../../utils/cssStyles'
import { AccountPopover } from "./AccountPopover";



const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  },
}));

// ----------------------------------------------------------------------

export const Header = ({ onOpenNav }) => {
  return (
    <StyledRoot>
       <StyledToolbar>
          <IconButton>
            <Iconify/>
          </IconButton>

         {/*  <Searchbar /> */}
         <Box sx={{ flexGrow: 1 }} />
         <Stack 
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
          }}>

            <AccountPopover />
         </Stack>

       </StyledToolbar>
    </StyledRoot>
  )
}
