// Aplicar filtro
export function applyFilter({
  inputData,
  filterName,
  filterSympathy,
  filterRoles,
  filterKnowledges,
  filterTools
  }) {
  
    let inputDatafilterName = [];
    let inputDatafilterRoles = [];
    let inputDatafilterKnowledges = [];
    let inputDatafilterTools = [];

    if (filterName) {
      inputDatafilterName = inputData.filter(
        (member) => { 
          const { user } = member
          return user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        }
      );
    }
  
    if (filterRoles.length > 0) {
        inputDatafilterRoles = inputData.filter((member) => {
          const filterRolesId = getID(filterRoles)
          const roles = member.profile.roles;
          return roles?.some((role) => filterRolesId.includes(role));
      })
    }

    if (filterKnowledges.length > 0) {
      inputDatafilterKnowledges = inputData.filter((member) => {
         const { knowledges } = member
         return knowledges?.find( (knowledge) => filterKnowledges.find(( fk ) => (fk === knowledge.name) ? true : false) )
       })
    }

    if (filterTools.length > 0) {
      inputDatafilterTools = inputData.filter((member) => {
         const filterToolsId = getID(filterTools)
         const tools = member.profiles?.flatMap((profile) => profile.tools);
         return tools?.some((tool) => filterToolsId.includes(tool));
       })
    }
  
    inputData = [ ...inputDatafilterName, ...inputDatafilterRoles, ...inputDatafilterKnowledges, ...inputDatafilterTools  ]

    return inputData;
  }


// Extract ID
const getID = ( list ) => list.map( li => li._id ) 