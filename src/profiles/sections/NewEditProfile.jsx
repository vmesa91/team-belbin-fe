
import { Box, Card, Container, Divider, MenuItem, Select, Snackbar, Stack, TextField, Typography } from "@mui/material"
// @mui

import { FormProvider } from "../../common/components/Form/FormProvider";
import { useForm } from "react-hook-form";
import { CustomAutocomplete } from "../../common/components/Form/CustomAutocomplete";
import { LoadingButton } from "@mui/lab";
import { CustomTextField } from "../../common/components/Form/CustomTextField";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from "react";
import { useDispatch , useSelector } from "react-redux";
import { createProfile , getProfiles, updateProfile } from "../../redux/store/profiles/profileThunk";
import { PATH_HOME, PATH_PROFILE } from "../../home/routes/paths"


export const NewEditProfile = ({ isEdit=false , currentProfile }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  // Comprobaciones
  const NewProfileSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    roles: Yup.array().min(1, 'Es requerido al menos 1 rol'),
    tools: Yup.array().min(2, 'Es requerido al menos 2 tecnologías'),
  })
 

  const { tools , roles, knowledges , errorMessage } = useSelector( state => state.dataStore )

  const defaultValues = useMemo(
    () => ({
      name: currentProfile?.name || '',
      description: currentProfile?.description || '',
      roles: currentProfile?.roles || [],
      tools: currentProfile?.tools || [],
    }),
    [ currentProfile ] 
  )

  const  methodsForm = useForm({ 
    resolver: yupResolver(NewProfileSchema),
    defaultValues })

  const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm

  const values = watch()

 useEffect(() => {
    if (isEdit && currentProfile) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentProfile]) 

  
  const onSubmit = ( data ) => {

    if (isEdit) {
      const { _id } = currentProfile
      dispatch(updateProfile(data, _id))
    }else {
      dispatch(createProfile(data))
    }   
    reset();
    navigate(PATH_HOME.dashboard);

  }
  
  return (

    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{display: 'flex', flexDirection: 'row', padding: '4%' , justifyContent: 'space-between'}}>
            <Stack
              rowGap={3}
              columnGap={1}
              ml='90px'
              >
                <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Nombre
                </Typography>
                <Typography variant="title" sx={{ color: 'text.secondary' }}>
                   Descripción
                </Typography>
              </Stack>
            <Stack
              rowGap={3}
              columnGap={2}
              flexDirection='row'
              flexWrap='wrap'
              >
                <CustomTextField name="name" label="Introduce el nombre del perfil" />
                <CustomTextField name="description" label="Introduce la descripción del perfil" multiline rows={4} sx={{ width: '100%' }} />
              </Stack>
          </Card>

     <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

     <Card sx={{ p: 3 , m: 4 }}>
        <Stack sx={{ display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>

          < CustomAutocomplete
              name="roles"
              label="Selecciona Rol"
              multiple
              filterSelectedOptions
              options={roles}
              getOptionLabel={(option)=>(option.name?option.name:'')}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              sx={{ width: '450px' }}
              />

          < CustomAutocomplete
              name="tools"
              label="Selecciona Tecnología" 
              multiple
              filterSelectedOptions
              options={tools}
              getOptionLabel={(option)=>(option.name?option.name:'')}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              sx={{ width: '450px' }}
              />
        </Stack>
     </Card>

      <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Crear Perfil' : 'Guardar Cambios'}
          </LoadingButton>
    
      </Stack>
  </FormProvider>

  )
}


