
import { onSetProfile } from "./profileSlice"
import api from "../../../api/config"



export const getProfiles = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/profile')
        dispatch(onSetProfile ( { type: 'profiles' , value : data.profiles  } ))
    }
}

export const createProfile = ( value ) => {

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


const searchID = ( value , store  ) => {
    const { id } = store.find( data => data.name === value )
    return id;
}