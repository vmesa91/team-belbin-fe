import { useSelector } from "react-redux"
import api from "../../../api/config"
import { onSetData } from "./dataSlice"



export const getDataForRoles = () => {
    
    return async (dispatch) => {    
        
        dispatch(onSetData({ type:'isLoading', value: true }))
        const { data } = await api.get('/role')
        dispatch(onSetData ( { type: 'roles' , value : data.roles  } ))
        setTimeout(() => {
            dispatch(onSetData({ type:'isLoading', value: false }))
        }, 3000);
        

    }
}

export const getDataForKnowledges = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/knowledge')
        dispatch(onSetData ( { type: 'knowledges' , value : data.knowledges  } ))
    }
}

export const getDataForTools = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/tool')
        dispatch(onSetData ( { type: 'tools' , value : data.tools  } ))
    }
}

export const createData = ( value ) => {

    const { dataOption , name , activation } = value

    return async (dispatch, getState) => {

        const { dataStore } = getState()

        let typeOption;
        let method;
        let actualState;

        switch (dataOption) {

            case 'Conocimiento':
                
                typeOption = 'knowledges'
                method = 'knowledge'
                actualState = dataStore.knowledges
                break;

            case 'Rol':
                
                typeOption = 'roles'
                method = 'role'
                actualState = dataStore.roles
                break;
        
            default:
                typeOption = 'tools'
                method = 'tool'
                actualState = dataStore.tools
                break;
        }
        // llamada al backend
        try{

            const data = { 
                name: name,
                activation: activation
            } 

            const resp = await api.post(`/${method}` , data)
            const newState = [ ...actualState,  { ...data, _id: resp.data.uid} ]
       
            dispatch(onSetData ( { type: typeOption , value : newState  } ))

        } catch(error) {
            dispatch(onSetData ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
    }
}


export const deleteData = ( id , type ) => {

    return async (dispatch, getState) => {
        
        const { dataStore } = getState()
        let typeOption = 'tools'
        let actualState = dataStore.tools
        let method = 'tool'
        let newState = []

        switch (type) {

            case 'Knowledge':
                typeOption = 'knowledges'
                method = 'knowledge'
                actualState = dataStore.knowledges
                break;
                
            case 'Rol':
                typeOption = 'roles'
                method = 'role'
                actualState = dataStore.roles
                break;
        
            default:
                break;
        }


        newState = actualState.filter( (row) => !id.includes(row._id))
       
        try{
           const resp = await api.delete(`/${method}/${id}`)
           dispatch(onSetData ( { type: typeOption , value : newState  } ))

        } catch( error ) {
            dispatch(onSetData ( { type: 'errorMessage' , value: error.response?.data?.msg || 'Error' } ))
        }
 
        }
        
    }


export const deleteDatas = ( value , type ) => {

    return async (dispatch, getState) => {
        
        const { dataStore } = getState()
        let typeOption = 'tools'
        let actualState = dataStore.tools
        let method = 'tool'
        let newState = []

        switch (type) {

            case 'Knowledge':
                typeOption = 'knowledges'
                method = 'knowledge'
                actualState = dataStore.knowledges
                break;
                
            case 'Rol':
                typeOption = 'roles'
                method = 'role'
                actualState = dataStore.roles
                break;
        
            default:
                break;
        }


        newState = actualState.filter( (row) => !value.includes(row))

        try{
          await value.map( (val) => { api.delete(`/${method}/${val._id}`) } ) 
           dispatch(onSetData ( { type: typeOption , value : newState  } ))

        } catch( error ) {
            dispatch(onSetData ( { type: 'errorMessage' , value: error.response.data?.msg || 'Error' } ))
        }
 
        }
        
    }
