import {  Container, Grid, Stack, Typography } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs"

import { TeamWidgetSummary } from "../sections/summary/TeamWidgetSummary"
import TeamIllustration from "../assets/illustrations/TeamIllustration"

import { TeamCarouselMembers } from "../sections/summary/TeamCarouselMembers"
import { LoadingButton } from "@mui/lab"
import { useDispatch, useSelector } from "react-redux"
import { createTeam, updateTeam } from "../../redux/store/teams/teamThunk"
import { useNavigate } from "react-router-dom"
import { PATH_HOME } from "../../home/routes/paths"
import TeamSympathySummary from "../sections/summary/TeamSympathySummary"
import { useTheme } from '@mui/material/styles';
import { sympathyWithLeader } from "../utils/sympathyWithLeader"


export const SummaryTeamPage = () => {

  const theme = useTheme();

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { configureTeam } = useSelector( state => state.teamStore )
  const { name, description, leader, roles, tools, knowledges, members, isEdit } = configureTeam 
  const seriesSympathy = sympathyWithLeader(members, leader)


  const onSubmit = () => {

  if (isEdit) {
    dispatch( updateTeam() )
  }else{   
    dispatch( createTeam() )
    
  } 
  navigate(PATH_HOME.dashboard); 
  }

  return (
   
    <>
        <Helmet>
          <title>  Equipos | Resumen Equipo Creado  </title>
      </Helmet>


      <Container maxWidth={'lg'}>
      <CustomBreadcrumbs
          heading="Resumen Equipo"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Equipos', href: '' },
            { name: 'Crear Equipo' },
          ]}
        />

      <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TeamWidgetSummary
              title={ name }
              description={ description }
              icon={<TeamIllustration />}
              teamlead={ leader }
            />
          </Grid>
         <Grid item xs={12} md={6}>
         <TeamSympathySummary
                title="Conexión del equipo"
                total={ members.length }
                chart={{
                  series: seriesSympathy,
                  colors: [
                    theme.palette.warning.dark,
                    theme.palette.error.main,
                    theme.palette.info.dark,
                    theme.palette.success.main,
                    theme.palette.warning.main,
                    theme.palette.info.main,
                  ],
                }}
              />
          </Grid> 

      <Grid item xs={12}>
        <TeamCarouselMembers
          title="Miembros del Equipo"
          subheader={ name }
          list={members}
       />
      </Grid> 
      </Grid>
        <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
            <LoadingButton onClick={ onSubmit } type="submit" variant="outlined">
              {!isEdit ? 'Crear Equipo' : 'Guardar Cambios'}
            </LoadingButton>
        </Stack>

      </Container>
    </>
   

  )
}
