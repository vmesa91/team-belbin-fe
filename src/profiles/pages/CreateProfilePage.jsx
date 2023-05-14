
// @mui
import { Container } from "@mui/material"

import { Helmet } from "react-helmet-async";
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs";
import { NewEditProfile } from "../sections/NewEditProfile";

import { PATH_HOME, PATH_PROFILE } from '../../home/routes/paths'


export const CreateProfilePage = () => {

  return (

    <>

     <Helmet>
        <title>  Perfiles | Crear Perfil  </title>
     </Helmet>

     <Container maxWidth={'lg'}>
     <CustomBreadcrumbs
         heading="Crear Perfil"
         links={[
           { name: 'Dashboard', href: PATH_HOME.dashboard },
           { name: 'Perfiles', href:'' },
           { name: 'Crear Perfil' },
         ]}
       />
          
      < NewEditProfile />

     </Container>
  </>

  )
}


