import { useDispatch } from "react-redux"
import { getDataForKnowledges, getDataForRoles, getDataForTools } from "../../redux/store/data/dataThunk"
import { getUsers } from "../../redux/store/user/userThunk"
import { getProfiles } from "../../redux/store/profiles/profileThunk"
import { getMembers, getRolesBelbin } from "../../redux/store/members/memberThunk"
import { getTeams } from "../../redux/store/teams/teamThunk"
import { useEffect } from "react"

  
  export const updataInfo = () => {

      // * Init APP
      const dispatch = useDispatch()
    
      useEffect(() => {
          // Data
          dispatch( getDataForRoles() )
          dispatch( getDataForKnowledges() )
          dispatch( getDataForTools() )
          // Users
          dispatch( getUsers() )
          // Profiles
          dispatch( getProfiles() )
          // Members
          dispatch( getMembers() )
          // Teams
          dispatch( getTeams() )
          // Roles belbin Graph
          dispatch( getRolesBelbin() )
  
        }, [])

  }
