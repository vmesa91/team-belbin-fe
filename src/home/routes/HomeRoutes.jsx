import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SettingsPage } from '../../admin/pages/SettingsPage'
import { ProfilesPage } from '../../profiles/pages/ProfilesPage'
import { TeamsPage } from '../../teams/pages/TeamsPage'
import { UsersPage } from '../../users/pages/UsersPage'
import { HomePage } from '../pages/HomePage'

export const HomeRoutes = () => {
  return (
    <>
    {/* Barra lateral */}
        <Routes>
            <Route path='/home' element={ < HomePage /> } ></Route>
            <Route path='/profiles' element={ < ProfilesPage /> }></Route>
            <Route path='/users' element={ < UsersPage /> }></Route>
            <Route path='/teams' element={ <TeamsPage /> }></Route>
            <Route path='/settings' element={ <SettingsPage /> }></Route>

        </Routes>
    </>
  )
}
