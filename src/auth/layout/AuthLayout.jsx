import { Helmet } from 'react-helmet-async';
import useResponsive from "../../hooks/useResponsive";
import styled from '@emotion/styled';
import { Link } from '@mui/material'
import { Container , Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../home/routes/paths';

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

  const navigate = useNavigate()
  return (
    <>
        <Helmet>
            <title> Team Maker UI </title>
        </Helmet>

        <StyledRoot>

        <Container maxWidth="sm" >
            <StyledContent>
                <Typography variant="h4" gutterBottom>
                  { title === 'Login' ? 'Bienvenido a Team Belbin' : 'Crear cuenta' }
                </Typography>

                {  title === 'Login' 
                
                 ?  
                  <Typography variant="body2" sx={{ mb: 5 }}>
                      ¿No tienes cuenta? {'  '}  
                      <Link onClick={() => { navigate(PATH_AUTH.register) }} variant="subtitle2">Registro</Link>
                  </Typography>

                  :  

                  <Typography variant="body2" sx={{ mb: 5 }}>
                       Volver al Login {'  '}  
                      <Link onClick={() => { navigate(PATH_AUTH.login) }}  variant="subtitle2">Login</Link>
                  </Typography>


                 }
                  
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

