// PRODUCT NEW EDIT FORM

import { Card, Container, Divider, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
// @mui
import { Helmet } from "react-helmet-async";
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs";
import { members } from '../../_mock/dataMembers'
import { dataRoles } from '../../_mock/dataRoles'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { FormProvider } from "../../common/components/Form/FormProvider";
import { useForm } from "react-hook-form";
import { CustomAutocomplete } from "../../common/components/Form/CustomAutocomplete";
import { LoadingButton } from "@mui/lab";
import { ScoreTecnology } from "../sections/score/ScoreTecnology";
import { CustomSelect } from "../../common/components/Form/CustomSelect";
import { ScoreColleagues } from "../sections/score/ScoreColleagues";



export const CreateMemberPage = ({ isEdit, currentProfile }) => {

  const  methodsForm = useForm() 
  const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm

  const onSubmit = () => {
    console.log('On Submit')
  }
  
  
  return (

    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>
    {/* Añadir todas las páginas : Helmet */}
     <Helmet>
        <title>  Usuario | Configuración  </title>
     </Helmet>

     <Container maxWidth={'lg'}>
       {/* Añadir todas las páginas : Breadcrumbs */}
     <CustomBreadcrumbs
         heading="Crear Miembro"
         links={[
           { name: 'Dashboard', href: '' },
           { name: 'Miembros', href: '' },
           { name: 'Crear Miembro' },
         ]}
       />
     <Card sx={{ p: 3 , m: 4 }}>
        <Stack sx={{ display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
            <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Nombre y Apellidos
            </Typography>
            < CustomSelect native
                name="Members"
                label="Selecciona un usuario activo" sx={{ width: '450px' }}>
                <option value="" />
                    {members.map((member) => (
                      <option key={member.id} label={member.name}>
                            {member.name}
                      </option>
                    ))}
            </CustomSelect>
        </Stack>

        <Stack sx={{ p: 3 , m: 4, display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
            <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Añadir Perfil/es
            </Typography>
            < CustomAutocomplete
              name="Perfiles"
              label="Selecciona uno o varios perfiles"
              multiple
              options={dataRoles.map((rol) => rol.name)}
              sx={{ width: '450px' }}
              />
        </Stack>

        < ScoreTecnology />

        <Stack sx={{ p: 3 , m: 4, display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
            <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Añadir Conocimiento/s
            </Typography>
            < CustomAutocomplete
              name="Conocimientos"
              label="Selecciona uno o varios conocimientos"
              multiple
              options={dataRoles.map((rol) => rol.name)}
              sx={{ width: '450px' }}
              />
        </Stack>

        <ScoreColleagues />
        
        <Stack sx={{ p: 3 , m: 4 , display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
            <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Añadir Idioma/s
            </Typography>
            < CustomAutocomplete
              name="Idiomas"
              label="Selecciona uno o varios idiomas"
              multiple
              options={dataRoles.map((rol) => rol.name)}
              sx={{ width: '450px' }}
              />
        </Stack>
     </Card>

     <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
          <LoadingButton type="submit" variant="contained">
          {!isEdit ? 'Crear Miembro' : 'Guardar Cambios'}
          </LoadingButton>
          <LoadingButton type="submit" variant="outlined" sx={{ marginTop: '0 !important' }}>
              Cancelar
          </LoadingButton>
      </Stack>
     </Container>
    </FormProvider>

  )
}

