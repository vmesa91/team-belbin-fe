import { isEmpty } from "lodash"


export const summaryOptions = ( type, list ) => {


    if (list === null) return '-'

    if ( isEmpty(list)) return '-'

    switch (type) {
        case 'roles':
           {
             const listConcat = list.map(( li ) => li.name )

             if (listConcat.length > 3) {
                const listSlice = listConcat.slice(0,2)
                const listSliceWarp = listConcat.slice(2)
                return listSlice.join(", ") + ` ( +${listSliceWarp.length.toString()} )`
             }
             else {
                return listConcat.join(", ")
             }
           }
        case 'members':
            {
                const listConcat = list.map(( li ) => li.user.name )
                if (listConcat.length > 3) {
                    const listSlice = listConcat.slice(0,2)
                    const listSliceWarp = listConcat.slice(2)
                    return listSlice.join(", ") + ` ( +${listSliceWarp.length.toString()} )`
                 }else {
                    return listConcat.join(", ")
                 }
            }
        case 'tools':
            {
                const listConcat = list.map(( li ) => li.name )
                if (listConcat.length > 3) {
                    const listSlice = listConcat.slice(0,2)
                    const listSliceWarp = listConcat.slice(2)
                    return listSlice.join(", ") + ` ( +${listSliceWarp.length.toString()} )`
                 } else {
                    return listConcat.join(", ")
                 }
            }
        case 'profile':
            {
                return list.name
    
            }

        case 'profileList':
             {
                const listConcat = list.map(( li ) => li.name )
                if (listConcat.length > 3) {
                    const listSlice = listConcat.slice(0,2)
                    const listSliceWarp = listConcat.slice(2)
                    return listSlice.join(", ") + ` ( +${listSliceWarp.length.toString()} )`
                    } else {
                    return listConcat.join(", ")
                    }
             }

        case 'teams':
            {
                const listConcat = list.map(( li ) => li.name )
                if (listConcat.length > 3) {
                    const listSlice = listConcat.slice(0,2)
                    const listSliceWarp = listConcat.slice(2)
                    return listSlice.join(", ") + ` ( +${listSliceWarp.length.toString()} )`
                 } else {
                    return listConcat.join(", ")
                 }
            }
        case 'language':
            {
                const listConcat = list.map(( li ) => li.name )
                if (listConcat.length > 3) {
                    const listSlice = listConcat.slice(0,2)
                    const listSliceWarp = listConcat.slice(2)
                    return listSlice.join(", ") + ` ( +${listSliceWarp.length.toString()} )`
                 } else {
                    return listConcat.join(", ")
                 }
            }
    
        default:
            break;
    }
}

