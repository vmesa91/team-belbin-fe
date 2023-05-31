import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        activeUser: null,
        users: [],
        errorMessage: undefined
    },
    reducers: {
        onSetUser: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetUser } = userSlice.actions;