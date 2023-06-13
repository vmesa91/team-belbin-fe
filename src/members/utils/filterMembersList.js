
export const filterMembersList = (  members ) => {

    return (members != undefined ) ? members.map( (member) => member.user  ) : []

}