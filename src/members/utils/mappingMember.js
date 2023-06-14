import { useSelector } from "react-redux"

export const mappingMember = (currentMember) => {

    const { user, expertise, colleagues } = currentMember

    const mappingUser = user._id

    const mappingExpertise = expertise.map( (exp) => ({ "tool": exp.tool._id , "score": exp.score.toString()}) )

    const mappingColleagues = colleagues.map( (coll) => ({ "user": coll.user._id , "score": coll.score.toString() }) )
        
    return {
        ...currentMember,
        user: mappingUser,
        expertise: mappingExpertise,
        colleagues: mappingColleagues
     }
} 