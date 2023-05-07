import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { CreateProfilePage } from '../../profiles/pages/CreateProfilePage'
import { TableProfilesPage } from '../../profiles/pages/TableProfilesPage'
import { AccountSettingsPage } from '../../members/pages/AccountSettingsPage'
import { CreateMemberPage } from '../../members/pages/CreateMemberPage'
import { TableMembersPage } from '../../members/pages/TableMembersPage'
import { CreateTeamPage } from '../../teams/pages/CreateTeamPage'
import { TableTeamsPage } from '../../teams/pages/TableTeamsPage'
import { HomeLayout } from '../../common/layouts/HomeLayout'
import { DataPage } from '../../admin/pages/DataPage'

export const HomeRoutes = () => {
    return (
        <>
            {/* Barra lateral */}
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/home/*" element={<HomePage />} />
                    <Route
                        path="/profile/createProfile"
                        element={<CreateProfilePage />}
                    ></Route>
                    <Route
                        path="/profile/tableProfiles"
                        element={<TableProfilesPage />}
                    ></Route>
                    <Route
                        path="/member/createMember"
                        element={<CreateMemberPage />}
                    ></Route>
                    <Route
                        path="/member/tableMembers"
                        element={<TableMembersPage />}
                    ></Route>
                    <Route
                        path="/team/createTeam"
                        element={<CreateTeamPage />}
                    ></Route>
                    <Route
                        path="/team/tableTeams"
                        element={<TableTeamsPage />}
                    ></Route>
                    <Route
                        path="/user/accountSettings"
                        element={<AccountSettingsPage />}
                    ></Route>
                    <Route
                        path="/data/createData"
                        element={<DataPage />}
                    ></Route>
                </Route>
            </Routes>
        </>
    )
}
