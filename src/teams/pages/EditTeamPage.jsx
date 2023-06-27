
import { Helmet } from "react-helmet-async"
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs"
import { NewEditTeam } from "../sections/NewEditTeam"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { paramCase } from "change-case";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { editTeam } from "../../redux/store/teams/teamThunk";

export const EditTeamPage = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch( editTeam(id) )
    }, [])
    
    const { teams } = useSelector( state => state.teamStore )
    const { members } = useSelector( state => state.memberStore )

    const foundTeam = teams.find((team) => paramCase(team._id) === id);
  
    const leaderData = members.find( ( member ) => member.user._id === foundTeam.leader._id )
    const currentTeam = { ...foundTeam, leader: leaderData }

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
            <NewEditTeam isEdit={true} currentTeam={currentTeam}/>
         </Container>
        </>
    
      )
}

