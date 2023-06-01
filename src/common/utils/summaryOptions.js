import { isEmpty } from "lodash"


export const summaryOptions = ( list ) => {

    if (list === null) return '-'

    if ( isEmpty(list)) return '-'
    
    const listSummary = list.map( (li )  => `${li?.name} , `   )
        
    return listSummary
}

