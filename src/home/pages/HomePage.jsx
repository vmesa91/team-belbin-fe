import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataForKnowledges, getDataForRoles, getDataForTools } from '../../redux/store/data/dataThunk'
import { getProfiles } from '../../redux/store/profiles/profileThunk'
import { getMembers } from '../../redux/store/members/memberThunk'
import { getTeams } from '../../redux/store/teams/teamThunk'
import { getUsers } from '../../redux/store/user/userThunk'
import { Helmet } from 'react-helmet-async'
import { Container, Grid, Typography } from '@mui/material'
import { AnalyticsWidgetSummary } from '../sections/analytics/AnalyticsWidgetSummary'
import { AnalyticsPieGraph } from '../sections/analytics/AnalyticsPieGraph'
// @mui
import { useTheme } from '@mui/material/styles';
import { AnalyticsDataActivity } from '../sections/analytics/AnalyticsDataActivity'


const TIME_LABELS = {
  week: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
  month: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  year: ['2022','2023'],
};

export const HomePage = () => {


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
    }, [])

    const theme = useTheme();

    const { teams } = useSelector( state => state.teamStore )
    const { roles, tools, knowledges } = useSelector( state => state.dataStore )
    const { members } = useSelector( state => state.memberStore )
    const { profiles } = useSelector( state => state.profileStore )
    const sumData = roles.length + knowledges.length + tools.length

    return (

    <>  
        <Helmet>
          <title> Home | Dashboard </title>
        </Helmet>
        
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
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ],
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsDataActivity
              title="Actividad"
              chart={{
                labels: TIME_LABELS,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.text.disabled,
                ],
                series: [
                  {
                    type: 'Week',
                    data: [
                      { name: 'Images', data: [20, 34, 48, 65, 37, 48] },
                      { name: 'Media', data: [10, 34, 13, 26, 27, 28] },
                      { name: 'Documents', data: [10, 14, 13, 16, 17, 18] },
                      { name: 'Other', data: [5, 12, 6, 7, 8, 9] },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      { name: 'Images', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Media', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Documents', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Other', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      { name: 'Images', data: [10, 34, 13, 56, 77] },
                      { name: 'Media', data: [10, 34, 13, 56, 77] },
                      { name: 'Documents', data: [10, 34, 13, 56, 77] },
                      { name: 'Other', data: [10, 34, 13, 56, 77] },
                    ],
                  },
                ],
              }}
            />
          </Grid>



          </Grid>
        </Container>

    </>
  )
}
