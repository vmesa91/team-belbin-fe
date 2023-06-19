
import { onSetProfile } from "./profileSlice"
import api from "../../../api/config"



export const getProfileId = (id) => {
    
    return async (dispatch) => {
    
        const { data } = await api.get(`/profile/${id}`)
        dispatch(onSetProfile ( { type: 'activeProfile' , value : data.profile  } ))
    }
}

export const getProfiles = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/profile')
        dispatch(onSetProfile ( { type: 'profiles' , value : data.profiles  } ))
    }
}


export const createProfile = ( value ) => {

    return async (dispatch, getState) => {

        const { profileStore } = getState()

        // To dispatch
        const { profiles } = profileStore
        const actualState = profiles

        try {

            const newData = {
                name: value.name,
                description: value.description,
                roles: getID(value.roles),
                tools: getID(value.tools)
            }

            const { data } = await api.post('/profile' , newData)

            const newState = [ ...actualState,  data.profile ]
 
            dispatch(onSetProfile ( { type: 'profiles' , value : newState  } ))

        } catch( error ) {
            console.log(error)
        }
    }
}

export const updateProfile = ( value, id ) => {


    return async (dispatch, getState) => {

        const { profileStore } = getState()

        // To dispatch
        const { profiles } = profileStore
        const actualState = profiles

        try {

            const newData = {
                name: value.name,
                description: value.description,
                roles: getID(value.roles),
                tools: getID(value.tools)
            }

            const { data } = await api.put(`/profile/${id}` , newData)

            const newState = [ ...actualState,  data.profile ]
 
            dispatch(onSetProfile ( { type: 'profiles' , value : newState  } ))

        } catch( error ) {
            console.log(error)
        }
    } 

}


export const deleteProfile = ( value ) => {

    return async (dispatch, getState) => {

        const { profileStore } = getState()

        let actualState = profileStore.profiles
        let newState = []

        newState = actualState.filter( (row) => !value.includes(row._id))

        try {
            await api.delete(`/profile/${value}`)
            dispatch(onSetProfile ( { type: 'profiles' , value : newState  } ))
        } catch ( error ) {
            dispatch(onSetProfile ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }

    }
}

export const deleteProfiles = ( value ) => {
    
    return async (dispatch, getState) => {

        const { profileStore } = getState()

        let actualState = profileStore.profiles
        let newState = []

        newState = actualState.filter( (row) => !value.includes(row._id))

        try {
            value.map((val) => { api.delete(`/profile/${val}`)} )
            dispatch(onSetProfile ( { type: 'profiles' , value : newState  } ))
        } catch ( error ) {
            dispatch(onSetProfile ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }

    }
}



// Extract ID
const getID = ( list ) => list.map( li => li._id )