
import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        tools: [],
        knowledges: [],
        roles: [],
        errorMessage: undefined,
        isLoading: false
    },
    reducers: {
        onSetData: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetData } = dataSlice.actions;