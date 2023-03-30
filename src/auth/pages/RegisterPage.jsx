import { Button, Grid, Link, TextField, Typography } from '@mui/material'

import React, { useContext } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {

/*   const {  login  } = useContext( AuthContext )
  const navigate = useNavigate()

  const onLogin = () => {

    
    login( 'Virgini Mesa' )
    navigate('/home', {
      replace: 'true'
    })
  } */

  return (
    
    <AuthLayout title='Register'>

          <form>
            <Grid container>

              <Grid item xs={ 12 } sx={{ mt: 2 }} >
                <TextField 
                  label="Nombre"
                  type="name"
                  placeholder='Nombre'
                  fullWidth
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }} >
                <TextField 
                  label="Apellidos"
                  type="surname"
                  placeholder='Apellidos'
                  fullWidth
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }} >
                <TextField 
                  label="Correo"
                  type="email"
                  placeholder='correo@google.com'
                  fullWidth
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }} > 
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder='Contraseña'
                  fullWidth
                />
              </Grid>

              <Grid container
              spacing={ 2 }
              sx={{ mb: 2, mt: 1}} > 

                <Grid item xs={ 12 }>
                  <Button variant='contained' fullWidth>
                    Registro
                  </Button>

                </Grid>
              </Grid>

              <Grid container
                direction='row'
                justifyContent='end'
              >
                <Typography sx={{ mr: 1 }}> ¿Ya tienes cuenta? </Typography>
                <Link component={ RouterLink } color='inherit' to='/auth/login'>
                  Ingresar
                </Link>
              </Grid>
            </Grid>
          </form>

    </AuthLayout>

  )
}
