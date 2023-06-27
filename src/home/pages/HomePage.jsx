
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Alert, Container, Grid, Typography } from '@mui/material'
import { AnalyticsWidgetSummary } from '../sections/analytics/AnalyticsWidgetSummary'
import { AnalyticsPieGraph } from '../sections/analytics/AnalyticsPieGraph'
// @mui
import { useTheme } from '@mui/material/styles';
import AnalyticsProfilesGraph from '../sections/analytics/AnalyticsProfilesGraph'
import { useDispatch } from "react-redux"
import { getDataForKnowledges, getDataForRoles, getDataForTools } from "../../redux/store/data/dataThunk"
import { getUsers } from "../../redux/store/user/userThunk"
import { getProfiles } from "../../redux/store/profiles/profileThunk"
import { getMembers, getRolesBelbin } from "../../redux/store/members/memberThunk"
import { getTeams } from "../../redux/store/teams/teamThunk"
import { useEffect, useState } from "react"
import Loading from '../../common/animations/Loading'


export const HomePage = () => {

    
    const theme = useTheme();
    // * Init APP
    const dispatch = useDispatch()

    useEffect(() => {
        // Data
        dispatch( getDataForRoles() )
        dispatch( getDataForKnowledges() )
        dispatch( getDataForTools() )
        // Users
        dispatch( getUsers() )
        // Profiles
        dispatch( getProfiles() )
        // Members
        dispatch( getMembers() )
        // Teams
        dispatch( getTeams() )
        // Roles belbin Graph
        dispatch( getRolesBelbin() )

      }, [])

  
    const { teams } = useSelector( state => state.teamStore )
    const { roles, tools, knowledges } = useSelector( state => state.dataStore )
    const { members, groupingRoles } = useSelector( state => state.memberStore )
    const { profiles , mostProfiles } = useSelector( state => state.profileStore )
    const sumData = roles.length + knowledges.length + tools.length  
    
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      if (Object.keys(groupingRoles).length > 0  & profiles.length > 0 & mostProfiles.length > 0 ){
        setIsLoading(false)
      }
    }, [groupingRoles, profiles, mostProfiles])
      
    return (

    <>  
        <Helmet>
          <title> Home | Dashboard </title>
        </Helmet>
        
        { isLoading ? < Loading /> :
        <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          ¡Bienvenido de nuevo! 
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Equipos"
              color="success"
              total={teams.length}
              icon="clarity:group-solid"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Perfiles"
              total={profiles.length}
              color="warning"
              icon="iconamoon:profile-circle-fill"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Miembros"
              total={members.length}
              color="error"
              icon="ic:twotone-remember-me"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Datos"
              total={sumData}
              color="info"
              icon="carbon:data-check"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsPieGraph
              title="Roles de Belbin"
              chart={{
                series: [
                  { label: 'Roles Mentales', value: groupingRoles['Roles Mentales'] },
                  { label: 'Roles Sociales', value: groupingRoles['Roles Sociales'] },
                  { label: 'Roles de Acción', value: groupingRoles['Roles de Acción'] }
                ],
                colors: [
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                ],
              }}
            />
          </Grid>

         <Grid item xs={12} md={6} lg={8}>
            <AnalyticsProfilesGraph
                title="Perfiles más populares"
                profiles={profiles}
                chart={{
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.error.main,
                    theme.palette.warning.main,
                  ],
                  series: [
                    { label: mostProfiles[0]?.name, value: mostProfiles[0]?.members },
                    { label: mostProfiles[1]?.name, value: mostProfiles[1]?.members },
                    { label: mostProfiles[2]?.name, value: mostProfiles[2]?.members },
                    { label: mostProfiles[3]?.name, value: mostProfiles[3]?.members },
                  ],
                }}
              />
          </Grid> 
          </Grid>

        </Container>}

    </>
  )
}
