import api from "../../../api/config"
import { useApi } from "../../../api/hooks/useApi"
import { sessionActive } from "../../../api/utils/sessionActive"
import { onSetAuth } from "./authSlice"


export const login = ( value ) => {

    return async ( dispatch ) => {

        dispatch(onSetAuth ( { type: 'status' , value: 'checking' } ))
        try {

            const { data } = await api.post( '/auth' , value)

            const user = { 
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    uid: data.uid,
                    image: data.image
                } 
        
            dispatch(onSetAuth ( { type: 'status' , value: 'authorized' } ))
            dispatch(onSetAuth ( { type: 'user' , value: user } ))
            sessionActive( 'login' , data )
        }
        catch (error) {
            dispatch(onSetAuth ( { type: 'status' , value: 'not-authorized' } ))
            dispatch(onSetAuth ( { type: 'errorMessage' , value: 'Credenciales incorrectas' } ))
        }
    }
}

export const logout = () => {

        return ( dispatch ) => {
            dispatch(onSetAuth ( { type: 'user' , value: '' } ))
            dispatch(onSetAuth ( { type: 'status' , value: 'not-authorized' } ))
            localStorage.clear()
        }
}

export const register = (value) => {

    return async ( dispatch ) => {
        try {
            dispatch(onSetAuth ( { type: 'status' , value: 'checking' } ))

            const { data } = await api.post( '/auth/register' , value )

            const user = { 
                name: data.name,
                surname: data.surname,
                email: data.email,
                uid: data.uid,
                image: data.image
            } 

            dispatch(onSetAuth ( { type: 'status' , value: 'authorized' } ))
            dispatch(onSetAuth ( { type: 'user' , value: user } ))
            sessionActive( 'register' , data )
        }
        catch (error) {
            dispatch(onSetAuth ( { type: 'status' , value: 'not-authorized' } ))
            dispatch(onSetAuth ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
    }

}

export const checkAuthToken = () => {

    const token = localStorage.getItem('token')

    return async ( dispatch ) => {
        
        if (!token) return
        {
            dispatch(onSetAuth ( { type: 'user' , value: '' } ))
            dispatch(onSetAuth ( { type: 'status' , value: 'not-authorized' } ))
        }

        try{

            const user = { 
                name: localStorage.getItem('name'),
                surname: localStorage.getItem('surname'),
                email: localStorage.getItem('email'),
                uid: localStorage.getItem('uid'),
                image:localStorage.getItem('image')
            } 

            const { data } = await api.get('/auth/refreshToken')

            localStorage.setItem('token' , data.token)

            dispatch(onSetAuth ( { type: 'status' , value: 'authorized' } ))
            dispatch(onSetAuth ( { type: 'user' , value: user } ))
            sessionActive( 'refreshToken' , data )
        } 
        catch (error){
            localStorage.clear()
            dispatch(onSetAuth ( { type: 'status' , value: 'not-authorized' } ))
            dispatch(onSetAuth ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
    }
}