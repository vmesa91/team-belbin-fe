// Aplicar filtro
export function applyFilter({
    inputData,
    filterName,
    filterProfile,
    filterMember,
    filterLanguage
    }) {
   
      
  if (filterName) {
        inputData = inputData.filter(
          (team) => { 
            return team.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
          }
        );
      }
    
      if (filterProfile.length > 0) {
          inputData = inputData.filter((team) => {
            const profiles = team.members.flatMap((member) => member.profile);
            return profiles.some((profile) => filterProfile.includes(profile.name));
        })
      }  
      if (filterMember.length > 0) {
        inputData = inputData.filter((team) => {
           const { members } = team
           return members.find( (member) => filterMember.find(( fm ) => (fm === member.user.name + ' ' + member.user.surname) ? true : false) )
         } 
       );
     } 
  
       if (filterLanguage.length > 0) {
        inputData = inputData.filter((team) => {
           const { language } = team
           return language.find( (lang) => filterLanguage.find(( fl ) => (fl === lang.name) ? true : false) )
         } 
       );
     } 
    
  
      return inputData;
    }
  
  
  // Extract ID
  const getID = ( list ) => list.map( li => li._id ) 