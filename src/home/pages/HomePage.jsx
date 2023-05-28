import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { HomeLayout } from '../../common/layouts/HomeLayout'
import { useDispatch } from 'react-redux'
import { getDataForKnowledges, getDataForRoles, getDataForTools } from '../../redux/store/data/dataThunk'
import { getProfiles } from '../../redux/store/profiles/profileThunk'

export const HomePage = () => {


  // * Init APP
  const dispatch = useDispatch()

  useEffect(() => {
      // Data
      dispatch( getDataForRoles() )
      dispatch( getDataForKnowledges() )
      dispatch( getDataForTools() )

      // Profiles
      dispatch( getProfiles() )

    }, [])

  return (
    <div> Dashboard </div>
  )
}
