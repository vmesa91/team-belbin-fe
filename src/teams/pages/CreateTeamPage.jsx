import React from 'react'
import { FormProvider } from '../../common/components/Form/FormProvider'
import { Helmet } from 'react-helmet-async'
import { Card, Container, Divider, MenuItem, Stack, Typography } from '@mui/material'
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs'
import { SetInputs } from '../../common/sections/form/SetInputs'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { CustomAutocomplete } from '../../common/components/Form/CustomAutocomplete'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { dataRoles } from '../../_mock/dataRoles'
import { members } from '../../_mock/dataMembers'
import { CustomTextField } from '../../common/components/Form/CustomTextField'
import { useNavigate } from "react-router-dom";
import { CustomSelect } from '../../common/components/Form/CustomSelect'

export const CreateTeamPage = ({ isEdit, currentProfile }) => {

  const  methodsForm = useForm() 
  const navigate = useNavigate();
  const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm

  const onSubmit = () => {
    console.log('On Submit')
  }

  const handleClickItem = (path) => {
    navigate(path);
  }; 

  const handleClickTeamLead = () => {
    console.log('Clear')
}
  
  return (

    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>
    {/* Añadir todas las páginas : Helmet */}
     <Helmet>
        <title>  Equipos | Crear Equipos  </title>
     </Helmet>

     <Container maxWidth={'lg'}>
       {/* Añadir todas las páginas : Breadcrumbs */}
     <CustomBreadcrumbs
         heading="Crear Equipo"
         links={[
           { name: 'Dashboard', href: '' },
           { name: 'Equipos', href: '' },
           { name: 'Crear Equipo' },
         ]}
       />
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
                <CustomTextField name="displayName" label="Introduce el nombre del perfil" />
                <CustomTextField name="description" label="Introduce la descripción del perfil" multiline rows={4} sx={{ width: '100%' }} />
                <CustomSelect
                      name={'teamLead'}
                      size="small"
                      label="Selecciona un líder del equipo"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: '100%' }}
                        >
                        {members.map((member) => (
                            <MenuItem
                                key={member.id}
                                value={member.name}
                                onClick={() => handleClickTeamLead(member.name)}
                            >
                                {member.name}
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
                  name="Roles"
                  label="Selecciona Rol"
                  multiple
                  options={dataRoles.map((rol) => rol.name)}
                  sx={{ width: '450px' }}
                />

              < CustomAutocomplete
                  name="Tecnología"
                  label="Selecciona Tecnología" 
                  multiple
                  options={dataTechnologies.map((technology) => technology.name)}
                  sx={{ width: '450px' }}
                  />
        
              < CustomAutocomplete
                  name="Conocimiento"
                  label="Añadir uno o más conocimientos"
                  multiple
                  options
                  ={dataKnowledges.map((knowledgde) => knowledgde.name)}
                  sx={{ p: 3}}
                  />
                  
              < CustomAutocomplete
                  name="Idioma"
                  label="Añadir uno o más idiomas"
                  multiple
                  options={dataTechnologies.map((technology) => technology.name)}
                  sx={{ p: 3}}
                  />
            </Stack>
     </Card>

     <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
          <LoadingButton type="submit" variant="contained">
              {'Cancelar'}
          </LoadingButton>
          <LoadingButton onClick={ () => handleClickItem( "/team/configTeam" ) } type="submit" variant="outlined">
              {'Siguiente'}
          </LoadingButton>
      </Stack>
     </Container>
    </FormProvider>

  )
}
