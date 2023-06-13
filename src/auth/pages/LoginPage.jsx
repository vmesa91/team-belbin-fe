
import { Alert, Box, Checkbox, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import { LoadingButton } from '@mui/lab';
import { Iconify } from '../../common/components/Iconify/Iconify';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../common/components/Form/FormProvider'
import { CustomTextField } from '../../common/components/Form/CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/store/auth/authThunk';

export const LoginPage = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { errorMessage } = useSelector( state => state.authStore )

  const dispatch = useDispatch()

  useEffect(() => {
    if (errorMessage !== undefined) {

      reset()
      setError('afterSubmit', {
        message: errorMessage
      })
      
    }

  }, [errorMessage])
  

  const defaultValues = {
    email: '',
    password: ''
  }

  const methods = useForm({ defaultValues });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = ( data ) => {
      dispatch( login( data ) )
      
  }

  return (
    <AuthLayout title='Login'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
              <CustomTextField name="email" label="Correo electrónico" />
              <CustomTextField name="password" label="Contraseña" type={ showPassword ? 'text' : 'password' } InputProps={ {
                  endAdornment: (
                      <InputAdornment position='end'>
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                          </IconButton>
                      </InputAdornment>
                  )
              }}/>
          </Stack>

          <Box sx={{ my: 2 }}/>
        
          <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitSuccessful || isSubmitting}
                sx={{
                  bgcolor: 'common.blue',
                  color: 'common.white',
                  '&:hover': {
                    bgcolor: 'text.primary',
                    color: 'common.white',
                  },
                }}
              >
                Acceso
        </LoadingButton>
      </FormProvider>
    </AuthLayout>
  )
}
