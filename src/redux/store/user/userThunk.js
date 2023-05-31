

import { onSetUser } from "./userSlice"
import api from "../../../api/config"



export const getUsers = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/user')
        dispatch(onSetUser ( { type: 'users' , value : data.users  } ))
    }
}