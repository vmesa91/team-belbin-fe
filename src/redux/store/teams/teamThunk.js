
import { onSetTeam } from "./teamSlice"
import api from "../../../api/config"



export const getTeams = () => {
    
    return async (dispatch) => {
    
        const { data } = await api.get('/team')
        dispatch(onSetTeam ( { type: 'teams' , value : data.teams  } ))
    }
}