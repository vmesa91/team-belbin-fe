
import { LoadingButton } from '@mui/lab'
import { Box, Card, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { FormProvider } from '../../../components/Form/FormProvider'
import { useForm } from 'react-hook-form'
import { CustomTextField } from '../../../components/Form/CustomTextField'
import account from '../../../../_mock/account'
import { styled, alpha } from '@mui/material/styles';
import { Image } from '../../../components/Image/Image'


const StyledDropZone = styled('div')(({ theme }) => ({
    width: 144,
    height: 144,
    margin: 'auto',
    display: 'flex',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '50%',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  }));

export const UserAccount = () => {

  const methods = useForm()
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
   console.log('On Submit')
  };

  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ justifyContent: 'flex-end' }} >
            <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                    <StyledDropZone>
                    <Image
                    alt="avatar"
                    src={account.photoURL}
                    sx={{
                        zIndex: 8,
                        overflow: 'hidden',
                        borderRadius: '50%',
                        position: 'absolute',
                        width: `calc(100% - 16px)`,
                        height: `calc(100% - 16px)`,
                     }}
                    />
                    </StyledDropZone>
                    <Typography variant="caption" sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.primary',
                    }}> { account.displayName } </Typography>
                    <Typography variant="caption" sx={{
                        mt: 1,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                    }}> { account.email } </Typography>
                </Card>
            </Grid>
            <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                    <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                    }}
                    >
                    <CustomTextField name="displayName" label="Nombre" />
                    <CustomTextField name="displaySurname" label="Apellidos" />
                    <CustomTextField name="profesion" label="Profesión" />
                    <CustomTextField name="city" label="Localización" />
                    <CustomTextField name="biography" label="Biografía" multiline rows={4} sx={{ width: '205%' }} />
                    
                    </Box>
                </Card>
                
            </Grid>
            <Grid item xs={12} md={8} >
                <Card sx={{ p: 3 }}>
                        <Box rowGap={3}
                            columnGap={2}
                            display="flex"
                         >
                            <CustomTextField name="password" label="Antigua Contraseña"/>
                            <CustomTextField name="password" label="Nueva Contraseña"/>
                           
                        </Box>
                        <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'flex-end', gap:'20px'}}>
                                    <LoadingButton type="submit" variant="contained">
                                        Guardar
                                    </LoadingButton>
                                    <LoadingButton type="submit" variant="outlined" sx={{ marginTop: '0 !important' }}>
                                        Cancelar
                                    </LoadingButton>
                            </Stack>
                    </Card>
            </Grid>
        </Grid>
    </FormProvider>
  )
}

