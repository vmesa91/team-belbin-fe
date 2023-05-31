import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./profiles/profileSlice";
import { dataSlice } from "./data/dataSlice";
import { authSlice } from "./auth/authSlice";
import { memberSlice } from "./members/memberSlice";
import { teamSlice } from "./teams/teamSlice";
import { userSlice } from "./user/userSlice";


export const store = configureStore({
    reducer: {
        authStore: authSlice.reducer,
        userStore: userSlice.reducer,
        dataStore: dataSlice.reducer,
        profileStore: profileSlice.reducer,
        memberStore: memberSlice.reducer,
        teamStore: teamSlice.reducer
    }
})