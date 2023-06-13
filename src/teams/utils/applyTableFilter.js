// Aplicar filtro
export function applyFilter({
    inputData,
    filterName,
    filterProfile,
    filterMember,
    filterLanguage
    }) {

      
     /*  if (filterName) {
        inputData = inputData.filter(
          (member) => { 
            const { user } = member
            return user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
          }
        );
      }
    
      if (filterProfile.length > 0) {
          inputData = inputData.filter((member) => {
            const filterRolesId = getID(filterRoles)
            const roles = member.profiles.flatMap((profile) => profile.roles);
            return roles.some((role) => filterRolesId.includes(role));
        })
      }
  
      if (filterKnowledges.length > 0) {
        inputData = inputData.filter((member) => {
           const { knowledges } = member
           return knowledges.find( (knowledge) => filterKnowledges.find(( fk ) => (fk === knowledge.name) ? true : false) )
         } 
       );
     }
  
      if (filterTools.length > 0) {
        inputData = inputData.filter((member) => {
           const { tools } = member
           return tools.find( (tool) => filterTools.find(( ft ) => (ft === tool.name) ? true : false) )
         } 
       );
     }
    
   */
  
      return inputData;
    }
  
  
  // Extract ID
  const getID = ( list ) => list.map( li => li._id ) 