
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profiles: [],
        mostProfiles: [],
        errorMessage: undefined
    },
    reducers: {
        onSetProfile: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetProfile } = profileSlice.actions;