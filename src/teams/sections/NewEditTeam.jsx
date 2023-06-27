
import { FormProvider } from '../../common/components/Form/FormProvider'
import { Box, Card, Divider, MenuItem, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomAutocomplete } from '../../common/components/Form/CustomAutocomplete'
import { dataCountries } from '../../_mock/dataCountries'
import { CustomTextField } from '../../common/components/Form/CustomTextField'
import { useNavigate } from "react-router-dom";
import { CustomSelect } from '../../common/components/Form/CustomSelect'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { configureTeam } from '../../redux/store/teams/teamThunk'
import { PATH_TEAM } from '../../home/routes/paths'

export const NewEditTeam = ({ isEdit, currentTeam }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    // Comprobaciones
    const NewTeamSchema = Yup.object().shape({
      name: Yup.string().required('El nombre del equipo es requerido'),
      description: Yup.string().required('La descripción es requerida'),
      leader: Yup.string().required('El líder es requerido'),
      roles: Yup.array().min(2, 'Es requerido al menos 2 roles'),
      tools: Yup.array().min(2, 'Es requerido al menos 2 tecnologías'),
      knowledges: Yup.array().min(2, 'Es requerido al menos 2 conocimientos'),
      language: Yup.array().min(1, 'Es requerido al menos 1 idioma'),
    })

  const defaultValues = useMemo(
    () => ({
      name: currentTeam?.name || '',
      description: currentTeam?.description || '',
      leader: currentTeam?.leader?._id || '',
      roles: currentTeam?.roles || [],
      tools: currentTeam?.tools || [],
      knowledges: currentTeam?.knowledges || [],
      language: currentTeam?.language || []
    }),
    [ currentTeam ] 
  )
  
  const  methodsForm = useForm({ 
    resolver: yupResolver(NewTeamSchema),
    defaultValues })

  const { tools , roles, knowledges , errorMessage } = useSelector( state => state.dataStore )
  const { teams } = useSelector( state => state.teamStore )
  const { members } = useSelector( state => state.memberStore )



  const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm

  const values = watch()

  useEffect(() => {
    if (isEdit && currentTeam) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentTeam]) 

  const onSubmit = (data) => {
    dispatch( configureTeam( data , isEdit ) )
    navigate(PATH_TEAM.configTeam)
  }
  
  return (

    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>

     <Card sx={{ p: 3, m: 4, display: 'flex', flexDirection: 'column', padding: '4%'}}>
            <Stack sx={{ 'margin': 'auto' }}>
                <Typography variant="h4" sx={{ color: 'text.primary' }}>
                              DATOS DEL PROYECTO                
                </Typography>
            </Stack>

            <Stack
              rowGap={3}
              columnGap={1}
              ml='90px'
              >
                <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
                    <Typography variant="subtitle" sx={{ color: 'text.secondary' }}>
                        Nombre
                    </Typography>
                    <CustomTextField name="name" label="Introduce el nombre del perfil" />
                </Box>

                <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
                    <Typography variant="subtitle" sx={{ color: 'text.secondary' }}>
                      Descripción
                    </Typography>
                    <CustomTextField name="description" label="Introduce la descripción del perfil" multiline rows={4} sx={{ width: '100%' }} />
                </Box>
            
              </Stack>
              <Stack sx={{ p: 3, m: 2, ml: 'auto', display: 'flex', padding: '6', flexWrap: 'wrap' , width: '88%'}}>
                  <Typography variant="subtitle" sx={{ color: 'text.secondary' }}>
                    Team Lead
                  </Typography>
                  <CustomSelect native
                        name="leader"
                        size="small"
                        label="Selecciona un líder del equipo"
                        >
                        <option value="" />
                        {members.map((member) => (
                        <option key={member._id} label={member.user.name + ' ' +  member.user.surname}>{member._id}</option>
                      )
                  )}
                  </CustomSelect>
              </Stack>
     </Card>

     <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

     <Card sx={{ p: 3, m: 4, display: 'flex', flexDirection: 'column', padding: '4%'}}>
            <Stack sx={{ 'margin': 'auto' }}>
                <Typography variant="h4" sx={{ color: 'text.primary' }}>
                    REQUISITOS DEL PROYECTO
                </Typography>
            </Stack>

            <Stack 
                rowGap={3}
                columnGap={1}
                ml='90px'>
              <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
                < CustomAutocomplete
                    name="roles"
                    label="Selecciona Rol"
                    filterSelectedOptions
                    multiple
                    options={roles}
                    getOptionLabel={(option)=>(option.name?option.name:'')}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    sx={{ p: 3 , width: '50%'}}
                  />

                < CustomAutocomplete
                    name="tools"
                    label="Selecciona Tecnología" 
                    filterSelectedOptions
                    multiple
                    options={tools}
                    getOptionLabel={(option)=>(option.name?option.name:'')}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    sx={{ p: 3, width: '50%'}}
                    />
              </Box>
        
              <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
                < CustomAutocomplete
                    name="knowledges"
                    label="Añadir uno o más conocimientos"
                    filterSelectedOptions
                    multiple
                    options={knowledges}
                    getOptionLabel={(option)=>(option.name?option.name:'')}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    sx={{ p: 3, width: '50%'}}
                    />
                    
                < CustomAutocomplete
                    name="language"
                    label="Selecciona uno o varios idiomas"
                    filterSelectedOptions
                    multiple
                    options={dataCountries}
                    getOptionLabel={(option)=>(option.name?option.name:'')}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    sx={{ p: 3, width: '50%'}}
                    />
              </Box>
            </Stack>
     </Card>

     <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
          <LoadingButton type="submit" variant="outlined">
              {'Siguiente'}
          </LoadingButton>
      </Stack>
     
    </FormProvider>

  )
}
