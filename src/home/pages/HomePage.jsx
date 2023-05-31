import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { HomeLayout } from '../../common/layouts/HomeLayout'
import { useDispatch } from 'react-redux'
import { getDataForKnowledges, getDataForRoles, getDataForTools } from '../../redux/store/data/dataThunk'
import { getProfiles } from '../../redux/store/profiles/profileThunk'
import { getMembers } from '../../redux/store/members/memberThunk'
import { getTeams } from '../../redux/store/teams/teamThunk'
import { getUsers } from '../../redux/store/user/userThunk'

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

  return (
    <div> Dashboard </div>
  )
}
