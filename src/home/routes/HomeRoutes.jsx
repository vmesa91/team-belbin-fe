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
import { ConfigTeamPage } from '../../teams/pages/ConfigTeamPage'
import { SummaryTeamPage } from '../../teams/pages/SummaryTeamPage'
import { EditProfilePage } from '../../profiles/pages/EditProfilePage'
import { EditMemberPage } from '../../members/pages/EditMemberPage'

export const HomeRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/home/*" element={<HomePage />} />

                    {/* PROFILE PATH */}
                    <Route
                        path="/profile/createProfile"
                        element={<CreateProfilePage />}
                    ></Route>
                    <Route
                        path="/profile/editProfile/:id"
                        element={<EditProfilePage />}
                    ></Route>
                    <Route
                        path="/profile/tableProfiles"
                        element={<TableProfilesPage />}
                    ></Route>

                    {/* MEMBER PATH */}        
                    <Route
                        path="/member/createMember"
                        element={<CreateMemberPage />}
                    ></Route>
                    <Route
                        path="/member/editMember/:id"
                        element={<EditMemberPage />}
                    ></Route>
                    <Route
                        path="/member/tableMembers"
                        element={<TableMembersPage />}
                    ></Route>

                    {/* TEAM PATH */}    
                    <Route
                        path="/team/createTeam"
                        element={<CreateTeamPage />}
                    ></Route>
                    <Route
                        path="/team/configTeam"
                        element={<ConfigTeamPage />}
                    ></Route>
                    <Route
                        path="/team/summaryTeam"
                        element={<SummaryTeamPage />}
                    ></Route>
                    <Route
                        path="/team/tableTeams"
                        element={<TableTeamsPage />}
                    ></Route>

                    {/* ACCOUNT PATH */}    
                    <Route
                        path="/user/accountSettings"
                        element={<AccountSettingsPage />}
                    ></Route>

                    {/* DATA PATH */}    
                    <Route
                        path="/data/createData"
                        element={<DataPage />}
                    ></Route>
                </Route>
            </Routes>
        </>
    )
}
