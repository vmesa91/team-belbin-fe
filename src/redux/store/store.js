import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./profiles/profileSlice";
import { dataSlice } from "./data/dataSlice";
import { authSlice } from "./auth/authSlice";


export const store = configureStore({
    reducer: {
        authStore: authSlice.reducer,
        dataStore: dataSlice.reducer,
        profileStore: profileSlice.reducer,
    }
})