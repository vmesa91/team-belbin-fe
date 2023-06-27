
import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
    name: 'member',
    initialState: {
        members: [],
        errorMessage: undefined,
        groupingRoles: {
            'Roles Mentales' : 0,
            'Roles Sociales' : 0,
            'Roles de Acción' : 0
        }
    },
    reducers: {
        onSetMember: ( state, { payload } ) => {
            state[payload.type] = payload.value
            return state
        },
    }
});



export const { onSetMember } = memberSlice.actions;