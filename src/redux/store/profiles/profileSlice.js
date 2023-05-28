
import { createSlice } from '@reduxjs/toolkit';
import { profiles as listProfiles } from '../../../_mock/dataProfiles'


export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        activeProfile: null,
        profiles: []
    },
    reducers: {
        onSetProfile: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetProfile } = profileSlice.actions;