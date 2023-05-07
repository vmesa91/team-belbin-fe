import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import styled from "@emotion/styled";
import { useState } from "react";




// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
  });

  const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  // ----------------------------------------------------------------------

export const HomeLayout = () => {

  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />
        <NavBar openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
            <Outlet />
        </Main>
    </StyledRoot>
  )
}
