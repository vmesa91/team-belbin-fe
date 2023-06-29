// Aplicar filtro
export function applyFilter({
    inputData,
    filterName,
    filterRol,
    filterTechnology,
    filterMember
  }) {
  
    if (filterName) {
      inputData = inputData.filter(
        (profile) =>
          profile.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }

    
    if (filterRol.length > 0) {
       inputData = inputData.filter((profile) => {
          const { roles } = profile
          return roles.find( (rol) => filterRol.find(( fr ) => (fr === rol.name) ? true : false) )
        } 
      );
    }

    if (filterTechnology.length > 0) {
       inputData = inputData.filter((profile) => {
          const { tools } = profile
        return tools.find( (tool) => filterTechnology.find(( ft ) => (ft === tool.name) ? true : false) )
        } 
      );
    }

    if (filterMember.length > 0) {
       inputData = inputData.filter((profile) => {
          const { members } = profile
          return members.find( (member) => filterMember.find(( fm ) => fm === member.user.name + ' ' + member.user.surname )? true : false)
          
        } 
      );
    }
  
  
    return inputData;
  }