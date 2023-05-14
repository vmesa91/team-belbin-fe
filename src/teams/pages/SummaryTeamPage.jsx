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


export const SummaryTeamPage = () => {

  const  methodsForm = useForm() 
  const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm

  const onSubmit = () => {
    console.log('On Submit')
  }

  return (
   
    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>
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
              title="Team 10"
              total={10}
              description={' '}
              icon={<TeamIllustration />}
              teamlead={ members[2] }
            />
          </Grid>
          <Grid item xs={12} md={6}>
                <TeamWidgetExpertise title="Experiencia del equipo" data={expertiseSummary} />
          </Grid>

      <Grid item xs={12}>
        <TeamCarouselMembers
          title="Miembros del Equipo"
          subheader=""
          list={members}
        />
      </Grid>
      </Grid>
        <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
            <LoadingButton type="submit" variant="contained">
                {'Atrás'}
            </LoadingButton>
            <LoadingButton onClick={ () => handleClickItem( "/team/configTeam" ) } type="submit" variant="outlined">
                {'Crear Equipo'}
            </LoadingButton>
        </Stack>

      </Container>
    </FormProvider>
   

  )
}
