import { LogoutOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Logout = () => {

  const {  logout  } = useContext( AuthContext )
  return (
    <IconButton color='error' onClick={ logout } to="/login">
         <LogoutOutlined />
    </IconButton>
  
  )
}
