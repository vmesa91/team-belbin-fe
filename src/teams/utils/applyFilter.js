// Aplicar filtro
export function applyFilter({
  inputData,
  filterName,
  filterSympathy,
  filterRoles,
  filterKnowledges,
  filterTools
  }) {


    console.log(inputData)
    
    if (filterName) {
      inputData = inputData.filter(
        (member) => { 
          const { user } = member
          return user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        }
      );
    }
  
    if (filterRoles.length > 0) {
      inputData = inputData.filter((member) => {
         const { profiles } = member
        
         profiles.map( ( profile ) => {
          const { roles } = profile
          
          return roles.find( (rol) => filterRoles.find(( fr ) => (fr === rol.name) ? true : false) )
         }  )
         
       } 
     )
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
  


    return inputData;
  }