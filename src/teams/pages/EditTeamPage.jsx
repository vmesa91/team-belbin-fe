
import { Helmet } from "react-helmet-async"
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs"
import { NewEditTeam } from "../sections/NewEditTeam"
import { useSelector } from "react-redux";

export const EditTeamPage = () => {

    const { name } = useParams();

    const { activeProfile , teams } = useSelector( state => state.teamStore )

    const currentTeam = teams.find((team) => paramCase(team.name) === name);

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
            <NewEditTeam isEdit currentTeam={currentTeam}/>
         </Container>
        </>
    
      )
}

