
import { Helmet } from 'react-helmet-async'
import { Container } from '@mui/material'
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs'
import { NewEditTeam } from '../sections/NewEditTeam'

export const CreateTeamPage = () => {
 
  return (

    <>
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
        <NewEditTeam />
     </Container>
    </>

  )
}
