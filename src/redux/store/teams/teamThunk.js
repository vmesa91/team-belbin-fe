
import { onSetTeam } from "./teamSlice"
import api from "../../../api/config"



export const getTeams = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/team')
        dispatch(onSetTeam ( { type: 'teams' , value : data.teams  } ))
    }
}

export const configureTeam = ( value ) => {
    console.log("🚀 ~ file: teamThunk.js:17 ~ configureTeam ~ value:", value)

    return ( dispatch ) => {
           
 /*        const data = {
            name,
            description,
            leader,
            roles: getID(roles),
            knowledges: getID(knowledges),
            tools: getID(tools),
            language
        } */

        dispatch( onSetTeam( { type: 'configureTeam' , value  } ))

    }
}

export const addMembersConfigureTeam = ( value ) => {

    return ( dispatch, getState ) => {
        
        const { teamStore } = getState()
        
        const { configureTeam } = teamStore

        const actualState = {
            ...configureTeam,
            members: value
        }

        dispatch( onSetTeam( { type: 'configureTeam' , value: actualState  } ))
    
    }

}

export const createTeam = ( value ) => {
    
    return async ( dispatch, getState ) => {

        const { teamStore } = getState()
           
        // To dispatch
        const { teams } = teamStore

        const actualState = teams

        try {

        } catch( error ) {
            console.log(error)
        }


    }

}

// Extract ID
const getID = ( list ) => list.map( li => li._id )