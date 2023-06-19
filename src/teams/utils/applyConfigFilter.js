// Aplicar filtro
export function applyFilter({
  inputData,
  filterRol,
  optionsRolBelbin,
  filterSympathy,
  leader,
  filterRoles,
  filterKnowledges,
  filterTools
  }) {


    let inputDatafilterRoles = [];
    let inputDatafilterKnowledges = [];
    let inputDatafilterTools = [];
  
    if (filterRoles.length > 0) {
        inputDatafilterRoles = inputData.filter((member) => {
          const filterRolesId = getID(filterRoles)
          const roles = member.profile?.roles;
          return roles?.some((role) => filterRolesId.includes(role));
      })
    }

    if (filterKnowledges.length > 0) {
      inputDatafilterKnowledges = inputData.filter((member) => {
         const { knowledges } = member
          return knowledges?.find( (knowledge) => filterKnowledges.find(( fk ) => (fk.name === knowledge.name) ? true : false) )
          
         })

       }

    if (filterTools.length > 0) {
      inputDatafilterTools = inputData.filter((member) => {
         const filterToolsId = getID(filterTools)
         const tools = member.profile?.tools;
         return tools?.some((tool) => filterToolsId.includes(tool));
       })
    }

    const inputDataAll = [ ...inputDatafilterRoles, ...inputDatafilterKnowledges, ...inputDatafilterTools  ]
    inputData = [ ... new Set(inputDataAll) ]

    if (filterRol.length > 0) {
      inputData = inputData.filter(
        (member) => { 
          const { belbinRol } = member
          const mappeo = mapperRoles(belbinRol, optionsRolBelbin)
          return  mappeo.some(( rol ) => filterRol.includes(rol.name))
        }
      );
    }
        

    if (filterSympathy !== 'Todos') {
      const { colleagues } = leader
      const listFive = colleagues.filter( (coll) =>  coll.score === 5)
      const listFour = colleagues.filter( (coll) =>  coll.score === 4)
      const listThree = colleagues.filter( (coll) =>  coll.score === 3)
      const listTwo = colleagues.filter( (coll) =>  coll.score === 2)
      const listOne = colleagues.filter( (coll) =>  coll.score === 1)

      inputData = inputData.filter((item) => {
        switch (filterSympathy) {
          case '5':
            return listFive.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
          case '4':
            return listFour.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
          case '3':
            return listThree.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
          case '2':
            return listTwo.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
          case '1':
            return listOne.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
          default:
            break;
        }
      })
    } 

    return inputData;
  }


// Extract ID
const getID = ( list ) => list.map( li => li._id ) 


const mapperRoles = ( listBelbin , optionsRolBelbin) => {
  return listBelbin.map(( idBelbin ) => optionsRolBelbin.find( (opt) => opt._id === idBelbin ))
} 