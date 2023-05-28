
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authorized',
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onSetAuth: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        }
    }
});

export const { onSetAuth } = authSlice.actions;