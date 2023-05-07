// PRODUCT NEW EDIT FORM 

import { Card, Container, MenuItem, Select, TextField, Typography } from "@mui/material"
// @mui
import { Helmet } from "react-helmet-async";
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs";
import { SetInputs } from "../../common/sections/form/SetInputs";
import { dataRoles } from '../../_mock/dataRoles'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { FormProvider } from "../../common/components/Form/FormProvider";
import { useForm } from "react-hook-form";
import { CustomAutocomplete } from "../../common/components/Form/CustomAutocomplete";
import { LoadingButton } from "@mui/lab";


export const CreateProfilePage = ({ isEdit, currentProfile }) => {

  const  methodsForm = useForm() 
  const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm

  const onSubmit = () => {
    console.log('On Submit')
  }
  
  return (

    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>
    {/* Añadir todas las páginas : Helmet */}
     <Helmet>
        <title>  Perfiles |Crear Perfil  </title>
     </Helmet>

     <Container maxWidth={'lg'}>
       {/* Añadir todas las páginas : Breadcrumbs */}
     <CustomBreadcrumbs
         heading="Crear Perfil"
         links={[
           { name: 'Dashboard', href: '' },
           { name: 'Perfiles', href: '' },
           { name: 'Crear Perfil' },
         ]}
       />
     <Card sx={{ p: 3 , m: 3 }}>
     < SetInputs inputFirst={'Nombre'} inputSecond={'Descripción'} multiline={true} />
     </Card>

     <Card sx={{ p: 3 , m: 3 }}>
         < CustomAutocomplete
            name="Roles"
            label="Roles"
            multiple
            freeSolo
            options={dataRoles.map((rol) => rol.name)}
            />

         < CustomAutocomplete
            name="Tecnología"
            label="Tecnología"
            multiple
            freeSolo
            options={dataTechnologies.map((technology) => technology.name)}
            />
     </Card>

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Crear Perfil' : 'Guardar Cambios'}
      </LoadingButton>
     </Container>
  </FormProvider>

  )
}


