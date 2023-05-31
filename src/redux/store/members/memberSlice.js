
import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
    name: 'member',
    initialState: {
        activeMember: null,
        members: [],
        errorMessage: undefined
    },
    reducers: {
        onSetMember: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetMember } = memberSlice.actions;