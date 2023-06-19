import { Card, Container, Grid, Stack, Typography } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs"
import { FormProvider } from "../../common/components/Form/FormProvider"
import { useForm } from "react-hook-form"
import { TeamWidgetSummary } from "../sections/summary/TeamWidgetSummary"
import TeamIllustration from "../assets/illustrations/TeamIllustration"
import { expertiseSummary } from '../../_mock/summary/expertiseSummary'
import { members } from '../../_mock/dataMembers'
import { TeamWidgetExpertise } from "../sections/summary/TeamWidgetExpertise"
import { TeamCarouselMembers } from "../sections/summary/TeamCarouselMembers"
import { LoadingButton } from "@mui/lab"
import { useDispatch, useSelector } from "react-redux"
import { createTeam } from "../../redux/store/teams/teamThunk"


export const SummaryTeamPage = () => {

  const  methodsForm = useForm() 
  const dispatch = useDispatch()

  const { configureTeam } = useSelector( state => state.teamStore )
  const { name, description, leader, roles, tools, knowledges, members } = configureTeam 

  const onSubmit = () => {
    //"/team/configTeam"
   dispatch( createTeam() )
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
              total={ members.length }
              description={ description }
              icon={<TeamIllustration />}
              teamlead={ leader }
            />
          </Grid>
         <Grid item xs={12} md={6}>
                <TeamWidgetExpertise title="Roles de Belbin en el equipo" data={members}/>
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
            <LoadingButton type="submit" variant="contained">
                {'Atrás'}
            </LoadingButton>
            <LoadingButton onClick={ onSubmit } type="submit" variant="outlined">
                {'Crear Equipo'}
            </LoadingButton>
        </Stack>

      </Container>
    </>
   

  )
}
