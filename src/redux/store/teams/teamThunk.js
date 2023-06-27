
import { onSetTeam } from "./teamSlice"
import api from "../../../api/config"



export const getTeams = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/team')
        dispatch(onSetTeam ( { type: 'teams' , value : data.teams  } ))
    }
}

export const editTeam = (id) => {

    return async (dispatch) => {

        dispatch(onSetTeam ( { type: 'idEditTeam' , value : id  } ))
    }
}

export const configureTeam = ( value , isEdit ) => {

     const { leader } = value

    return ( dispatch , getState ) => {

        const { memberStore } = getState()
        const { members } = memberStore
        const dataLeader = members.find( (member) => member._id === leader  )
        
        dispatch( onSetTeam( { type: 'configureTeam' , value: { ...value, leader: dataLeader, isEdit: isEdit }  } ))

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

            const newState = [ ...actualState, data.team ]

            dispatch(onSetTeam ( { type: 'teams' , value : newState  } ))

        } catch( error ) {
            console.log(error)
        }


    }

}

export const updateTeam = () => {

    return async (dispatch , getState ) => {

        const { teamStore } = getState()
        
        const { teams , configureTeam , idEditTeam } = teamStore
        
        const { name, description, leader, roles, tools, knowledges, language, members } = configureTeam

        const actualState = teams
        
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

        try {
            
            const { data } = await api.put(`/team/${idEditTeam}` , newTeam)
    
            let newState = actualState.filter( (row) => row._id != value._id)
    
            newState = [ ...newState,  data.updateTeam ]
            console.log("🚀 ~ file: teamThunk.js:119 ~ return ~ newState:", newState)

            dispatch(onSetTeam ( { type: 'teams' , value : newState  } ))

        }catch(error){
            console.log(error)
        }
    }
}

export const deleteTeam = ( value ) => {

    return async  ( dispatch, getState )  => {
        
        const { teamStore } = getState()
        let actualState = teamStore.teams
        let newState = []

        newState = actualState.filter( (row) => !value.includes(row._id))

        try {
            await api.delete(`/team/${value}`)
            
            dispatch(onSetTeam( { type: 'teams', value: newState } ))
        }catch( error ) {
            dispatch(onSetTeam( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
    }
}

export const deleteTeams = (value) => {

    return async ( dispatch, getState ) => {
        
        const { teamStore } = getState()
    
        let actualState = teamStore.teams
        let newState = []
    
        newState = actualState.filter( (row) => !value.includes(row._id))
        
        try {
            value.map((val) => { api.delete(`/team/${val}`)} )
            dispatch(onSetTeam ( { type: 'teams' , value : newState  } ))
        }catch(error){
            dispatch(onSetTeam ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
    }
    

}
// Extract ID
const getID = ( list ) => list.map( li => li._id )