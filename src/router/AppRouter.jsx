
import { Route, Routes } from 'react-router-dom'
import { HomeRoutes } from '../home/routes/HomeRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='auth/*' element= { 
          < PublicRoute >
              < AuthRoutes />
          </PublicRoute>
         } />
         

        <Route path='/*' element= { 
        < PrivateRoute>
             < HomeRoutes />
        </PrivateRoute> } />
    </Routes>
  )
}