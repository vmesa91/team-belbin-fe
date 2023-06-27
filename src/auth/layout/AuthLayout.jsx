import { Helmet } from 'react-helmet-async';
import useResponsive from "../../hooks/useResponsive";
import styled from '@emotion/styled';

import { Container , Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      backgroundColor:'white'
    },
  }))

const StyledSection = styled('div')(({ theme }) => ({
display: 'flex',
width: '200%',
backgroundColor: 'white'
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

// ----------------------------------------------------------------------

export const AuthLayout = ( { children , title = '' } ) => {

  const mdUp = useResponsive('up', 'md')
  return (
    <>
        <Helmet>
            <title> Team Maker UI </title>
        </Helmet>

        <StyledRoot>

        <Container maxWidth="sm" >
            <StyledContent>
                <Typography variant="h4" gutterBottom>
                  BIENVENIDO!! 
                </Typography>

                <Typography variant="body2" sx={{ mb: 5 }}>
                    Don’t have an account? {''}
                    <Link variant="subtitle2">Registro</Link>
                </Typography>
                  
                  {/* LOGIN OR REGISTER */}
                  { children }
                
              </StyledContent>
            </Container>

            <StyledSection>
              <img src={
                title === 'Login' ? "/assets/illustrations/Doodle.svg" : "/assets/illustrations/Doodle_Register.svg"} alt="login" />
            </StyledSection>
         </StyledRoot>
    </>
  )
}

