
import { Checkbox, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Iconify } from '../../common/components/Iconify/Iconify';

export const RegisterPage = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };
  return (
    <AuthLayout title='Register'>
        <Stack spacing={3}>
            <TextField name="name" label="Nombre" />
            <TextField name="surname" label="Apellidos" />
            <TextField name="email" label="Email address" />
            <TextField name="password" label="Password" type={ showPassword ? 'text' : 'password' } InputProps={ {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                        </IconButton>
                    </InputAdornment>
                )
            }}/>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Registro
      </LoadingButton>

    </AuthLayout>
  )
}
