import { Box, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs'
import { UserAccount } from '../../common/sections/user/account/UserAccount'

export const AccountSettingsPage = () => {
  return (
   
    <>
     {/* Añadir todas las páginas : Helmet */}
      <Helmet>
         <title>  Usuario | Configuración  </title>
      </Helmet>

      <Container maxWidth={'lg'}>
        {/* Añadir todas las páginas : Breadcrumbs */}
      <CustomBreadcrumbs
          heading="Cuenta Personal"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Usuario', href: '' },
            { name: 'Configuración' },
          ]}
        />
      <Box>
        <UserAccount/>
      </Box>
      </Container>
    </>
  )
}
