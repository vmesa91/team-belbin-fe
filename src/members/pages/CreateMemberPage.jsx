// PRODUCT NEW EDIT FORM

import { Card, Container, Divider, MenuItem, Select, TextField, Typography } from "@mui/material"
// @mui
import { Helmet } from "react-helmet-async";
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs";
import { SetInputs } from "../../common/sections/form/SetInputs";
import { dataRoles } from '../../_mock/dataRoles'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { FormProvider } from "../../common/components/Form/FormProvider";
import { useForm } from "react-hook-form";
import { CustomAutocomplete } from "../../common/components/Form/CustomAutocomplete";
import { LoadingButton } from "@mui/lab";
import { ScoreTecnology } from "../../profiles/sections/ScoreTecnology";



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
     <Card sx={{ p: 3 }}>
          < SetInputs inputFirst={'Nombre'} inputSecond={'Apellidos'}/>
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



        < ScoreTecnology />


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

