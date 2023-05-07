import React from 'react'
import { FormProvider } from '../../common/components/Form/FormProvider'
import { Helmet } from 'react-helmet-async'
import { Card, Container, Divider } from '@mui/material'
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs'
import { SetInputs } from '../../common/sections/form/SetInputs'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { CustomAutocomplete } from '../../common/components/Form/CustomAutocomplete'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { dataRoles } from '../../_mock/dataRoles'

export const CreateTeamPage = ({ isEdit, currentProfile }) => {
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
         heading="Crear Equipo"
         links={[
           { name: 'Dashboard', href: '' },
           { name: 'Equipos', href: '' },
           { name: 'Crear Equipo' },
         ]}
       />
     <Card sx={{ p: 3 }}>
          < SetInputs inputFirst={'Nombre'} inputSecond={'Descripción'} multiline={true}/>
     </Card>

     <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

     <Card sx={{ p: 3 , m: 3 }}>
         < CustomAutocomplete
            name="Perfil"
            label="Añadir uno o más perfiles"
            multiple
            freeSolo
            options={dataRoles.map((rol) => rol.name)}
            sx={{ p: 3}}
            />

         < CustomAutocomplete
            name="Conocimiento"
            label="Añadir uno o más conocimientos"
            multiple
            freeSolo
            options
            ={dataKnowledges.map((knowledgde) => knowledgde.name)}
            sx={{ p: 3}}
            />

         < CustomAutocomplete
            name="Idioma"
            label="Añadir uno o más idiomas"
            multiple
            freeSolo
            options={dataTechnologies.map((technology) => technology.name)}
            sx={{ p: 3}}
            />
     </Card>

     <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Crear Miembro' : 'Guardar Cambios'}
            </LoadingButton>
     </Container>
    </FormProvider>

  )
}
