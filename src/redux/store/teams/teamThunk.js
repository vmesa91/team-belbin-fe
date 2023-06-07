
import { onSetTeam } from "./teamSlice"
import api from "../../../api/config"



export const getTeams = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/team')
        dispatch(onSetTeam ( { type: 'teams' , value : data.teams  } ))
    }
}

export const configureTeam = ( value ) => {

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
const getID = ( list ) => list.map( li => li.id )