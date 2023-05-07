
import { Checkbox, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import { LoadingButton } from '@mui/lab';
import { Iconify } from '../../common/components/Iconify/Iconify';

export const LoginPage = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {  login  } = useContext( AuthContext )

  const handleClick = () => {
    login('Virginia Mesa')
    navigate('/home', { replace: true });
  };
  return (
    <AuthLayout title='Login'>
        <Stack spacing={3}>
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
              <Checkbox name="remember" label="Remember me" />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
              Acceso
        </LoadingButton>

    </AuthLayout>
  )
}
