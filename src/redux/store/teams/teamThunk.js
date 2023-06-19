
import { onSetTeam } from "./teamSlice"
import api from "../../../api/config"



export const getTeams = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/team')
        dispatch(onSetTeam ( { type: 'teams' , value : data.teams  } ))
    }
}

export const configureTeam = ( value ) => {

     const { leader } = value

    return ( dispatch , getState ) => {

        const { memberStore } = getState()
        const { members } = memberStore
        const dataLeader = members.find( (member) => member._id === leader  )
           

        dispatch( onSetTeam( { type: 'configureTeam' , value: { ...value, leader: dataLeader }  } ))

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

export const createTeam = () => {
    
    return async ( dispatch, getState ) => {

        const { teamStore } = getState()
           
        // To dispatch
        const { teams , configureTeam } = teamStore
        const { name, description, leader, roles, tools, knowledges, language, members } = configureTeam

        const actualState = teams

        try {

            const newTeam = {
                name,
                description, 
                leader: leader.user._id,
                roles: getID(roles),
                tools: getID(tools),
                knowledges: getID(knowledges),
                language,
                members: getID(members)
            }

            const { data } = await api.post('/team', newTeam)
            console.log(data)

        } catch( error ) {
            console.log(error)
        }


    }

}

// Extract ID
const getID = ( list ) => list.map( li => li._id )