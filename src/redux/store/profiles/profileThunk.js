
import { onSetProfile } from "./profileSlice"
import api from "../../../api/config"



export const getProfiles = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/profile')
        dispatch(onSetProfile ( { type: 'profiles' , value : data.profiles  } ))
    }
}


export const createProfile = ( value ) => {

    console.log(value)

    return async (dispatch, getState) => {

        const { profileStore , dataStore } = getState()
        const { tools:toolsStore , roles:rolesStore } = dataStore
        const { roles:rolesNewValue , tools:toolsNewValue } = value

        // To dispatch
        const { profiles } = profileStore

        const actualState = profiles

        try{
            // Buscar IDs
            const idRoles = rolesNewValue.map( (role) => searchID( role , rolesStore ))
            const idTools = toolsNewValue.map( (tool) => searchID( tool , toolsStore ))

            const data = {
                name: value.name,
                description: value.description,
                roles: idRoles,
                tools: idTools
            }

            const resp = await api.post('/profile' , data)
            const newState = [ ...actualState,  { ...data, id: resp.data.uid} ]
 
            dispatch(onSetProfile ( { type: 'profiles' , value : newState  } ))

        } catch( error ) {
            console.log(error)
        }
    }
}

export const updateProfile = () => {

}


export const deleteProfile = ( value ) => {

    console.log(value)
    

    return async (dispatch, getState) => {

        const { profileStore } = getState()

        let actualState = profileStore.profiles
        console.log(actualState)
        let newState = []

        newState = actualState.filter( (row) => !value.includes(row.id))

        try {
            await api.delete(`/profile/${value}`)
            dispatch(onSetProfile ( { type: 'profiles' , value : newState  } ))
        } catch ( error ) {
            dispatch(onSetProfile ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }

    }
}

export const deleteProfiles = ( value ) => {

    console.log(value)
    
    return async (dispatch, getState) => {

        const { profileStore } = getState()

        let actualState = profileStore.profiles
        let newState = []

        newState = actualState.filter( (row) => !value.includes(row.id))
        console.log(newState)

        try {
            value.map((val) => { api.delete(`/profile/${val}`)} )
            dispatch(onSetProfile ( { type: 'profiles' , value : newState  } ))
        } catch ( error ) {
            dispatch(onSetProfile ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }

    }
}



// ***  Methods to get ID 

const searchID = ( value , store  ) => {
    const { id } = store.find( data => data.name === value )
    return id;
}