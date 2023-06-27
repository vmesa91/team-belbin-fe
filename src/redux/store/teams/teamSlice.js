
import { createSlice } from '@reduxjs/toolkit';

export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        configureTeam: null,
        idEditTeam: '',
        teams: [],
        errorMessage: undefined
    },
    reducers: {
        onSetTeam: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetTeam } = teamSlice.actions;