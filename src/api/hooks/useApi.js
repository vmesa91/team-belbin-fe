import api from "../config"



export const useApi = ( method, data, endpoint ) => {

     const resp = api[method](endpoint, data && data)

     return resp
      
}
