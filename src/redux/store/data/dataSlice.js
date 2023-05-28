
import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        activeData: null,
        tools: [],
        knowledges: [],
        roles: [],
        errorMessage: undefined
    },
    reducers: {
        onSetData: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetData } = dataSlice.actions;