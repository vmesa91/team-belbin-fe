import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'


export const PrivateRoute = ({ children , status }) => {

  return (
    (status === 'authorized')
    ? children
    : <Navigate to="/auth/login"/>
  )
  
}
