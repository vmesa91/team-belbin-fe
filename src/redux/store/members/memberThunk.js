
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
        const { user, profiles, knowledges, expertise, colleagues, belbinRol, language} = value
        try {

              // To dispatch
            const { members } = memberStore
            const actualState = members

            const data = {
                user,
                profiles: getID(profiles),
                belbinRol: getID(belbinRol),
                expertise,
                colleagues,
                knowledges: getID(knowledges),
                language: getID(language)
            }
            
            console.log(data)
            const resp = await api.post('/member' , data)
            const newState = [ ...actualState,  { ...data, id: resp.data.uid} ]
 
            dispatch(onSetMember ( { type: 'members' , value : newState  } ))

        } catch(error){
            console.log(error)
        }

    }
} 


// Extract ID

const getID = ( list ) => list.map( li => li.id ) 