
import { onSetMember } from "./memberSlice"
import api from "../../../api/config"



export const getMembers = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/member')
        dispatch(onSetMember ( { type: 'members' , value : data.member  } ))
    }
}


export const createMember = ( value ) => {

    return async( dispatch, getState ) => {
        
        const { memberStore } = getState()
        const { user, profile, knowledges, expertise, colleagues, belbinRol, language} = value
        try {

              // To dispatch
            const { members } = memberStore
            const actualState = members

            const newData = {
                user,
                profile: profile._id,
                belbinRol: getID(belbinRol),
                expertise,
                colleagues,
                knowledges: getID(knowledges),
                language: language
            }
            
            const { data } = await api.post('/member' , newData)
            
            const newState = [ ...actualState,  data.member ]
        
            dispatch(onSetMember ( { type: 'members' , value : newState  } ))

        } catch(error){
            dispatch(onSetMember ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        } 

    }
} 

export const updateMember = ( value, id) => {

    return async( dispatch, getState ) => {
        
        const { memberStore } = getState()
        const { user, profile, knowledges, expertise, colleagues, belbinRol, language} = value
        try {

              // To dispatch
            const { members } = memberStore
            const actualState = members

            const newData = {
                user,
                profile: profile._id,
                belbinRol,
                expertise,
                colleagues,
                knowledges: getID(knowledges),
                language: language
            }
            
            const { data } = await api.put(`/member/${id}` , newData)

            let newState = actualState.filter( (row) => row.user._id != value.user._id)

            newState = [ ...newState,  data.updateMember ]
        
            dispatch(onSetMember ( { type: 'members' , value : newState  } ))

        } catch(error){
            dispatch(onSetMember ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        } 
    }
} 

export const deleteMember = (value) => { 

    return async (dispatch, getState) => {

        const { memberStore } = getState()
    
        let actualState = memberStore.members
        let newState = []

        newState = actualState.filter( (row) => !value.includes(row._id))

        try {
            const rest = await api.delete(`/member/${value}`)
    
            dispatch(onSetMember ( { type: 'members' , value : newState  } ))
        } catch ( error ) {
            dispatch(onSetMember ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
    }
}
export const deleteMembers = (value) => {

        return async (dispatch, getState) => {

        const { memberStore } = getState()

        let actualState = memberStore.members
        let newState = []

        newState = actualState.filter( (row) => !value.includes(row._id))

        try {
            await value.map((val) => { api.delete(`/member/${val}`)} )
            dispatch(onSetMember ( { type: 'members' , value : newState  } ))
        } catch ( error ) {
            dispatch(onSetMember ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }

    }
}

export const getRolesBelbin = () => {

    return async ( dispatch ) => {

        try {
            const { data } = await api.get('/member/rolesBelbin')
            dispatch( onSetMember (  {type: 'groupingRoles', value: data.result} ) )
        } catch (error) {
            dispatch(onSetMember ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
    }
} 


// Extract ID
const getID = ( list ) => list.map( li => li._id )
