
import { Route, Routes } from 'react-router-dom'
import { HomeRoutes } from '../home/routes/HomeRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthToken } from '../redux/store/auth/authThunk'
import { useEffect } from 'react'

export const AppRouter = () => {

  const { status } = useSelector( state => state.authStore )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthToken())
  }, [])

  if (status === 'checking') return <></>

  return (
    <Routes>
        <Route path='auth/*' element= { 
          < PublicRoute status={status}>
              < AuthRoutes />
          </PublicRoute>
         } />
         

        <Route path='/*' element= { 
        < PrivateRoute status={status}>
             < HomeRoutes />
        </PrivateRoute> } />
    </Routes>
  )
}