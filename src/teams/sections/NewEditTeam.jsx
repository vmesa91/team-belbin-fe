
import { FormProvider } from '../../common/components/Form/FormProvider'
import { Card, Divider, MenuItem, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { CustomAutocomplete } from '../../common/components/Form/CustomAutocomplete'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { dataCountries } from '../../_mock/dataCountries'
import { CustomTextField } from '../../common/components/Form/CustomTextField'
import { useNavigate } from "react-router-dom";
import { CustomSelect } from '../../common/components/Form/CustomSelect'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { configureTeam, createTeam } from '../../redux/store/teams/teamThunk'
import { PATH_TEAM } from '../../home/routes/paths'

export const NewEditTeam = ({ isEdit, currentTeam }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const defaultValues = useMemo(
    () => ({
      name: currentTeam?.name || '',
      description: currentTeam?.description || '',
      leader: currentTeam?.leader || '',
      roles: currentTeam?.role || [],
      tools: currentTeam?.tools || [],
      knowledges: currentTeam?.knowledges || [],
      language: currentTeam?.language || []
    }),
    [ currentTeam ] 
  )

  const  methodsForm = useForm({ defaultValues })

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
    dispatch( configureTeam( data ) )
    navigate(PATH_TEAM.configTeam)
  }
  
  return (

    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>

     <Card sx={{ p: 3, m: 4, display: 'flex', flexDirection: 'row', padding: '4%' , justifyContent: 'space-between'}}>
            <Stack>
                <Typography variant="title" sx={{ color: 'text.primary' }}>
                    Datos del Proyecto
                </Typography>
            </Stack>

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
                <Typography variant="title" sx={{ color: 'text.secondary' }}>
                   Team Lead
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
                <CustomSelect
                      name="leader"
                      size="small"
                      label="Selecciona un líder del equipo"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: '100%' }}
                        >
                        {members.map((member) => (
                            <MenuItem
                                key={member._id}
                                value={member._id}
            
                            >
                                { member.user.name + ' ' + member.user.surname }
                            </MenuItem>
                        ))}

                        </CustomSelect>
              </Stack>
     </Card>

     <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

     <Card sx={{ p: 3, m: 4, padding: '4%' , justifyContent: 'space-between'}}>
            <Stack>
                <Typography variant="title" sx={{ color: 'text.primary' }}>
                    Requisítos del proyecto
                </Typography>
            </Stack>

            <Stack sx={{ }}>
              < CustomAutocomplete
                  name="roles"
                  label="Selecciona Rol"
                  multiple
                  options={roles}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: '450px' }}
                />

              < CustomAutocomplete
                  name="tools"
                  label="Selecciona Tecnología" 
                  multiple
                  options={tools}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: '450px' }}
                  />
        
              < CustomAutocomplete
                  name="knowledges"
                  label="Añadir uno o más conocimientos"
                  multiple
                  options={knowledges}
                  getOptionLabel={(option) => option.name}
                  sx={{ p: 3}}
                  />
                  
              < CustomAutocomplete
                  name="language"
                  label="Añadir uno o más idiomas"
                  multiple
                  options={dataCountries.map((language) => language.name)}
                  sx={{ p: 3}}
                  />
            </Stack>
     </Card>

     <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
          <LoadingButton type="submit" variant="contained">
              {'Cancelar'}
          </LoadingButton>
          <LoadingButton type="submit" variant="outlined">
              {'Siguiente'}
          </LoadingButton>
      </Stack>
     
    </FormProvider>

  )
}
