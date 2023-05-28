import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'


export const PublicRoute = ({ children , status}) => {

  return (
    (status === ('not-authorized'))
    ? children
    : <Navigate to="/home"/>
  )
}
