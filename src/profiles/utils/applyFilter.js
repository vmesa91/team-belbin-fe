// Aplicar filtro
export function applyFilter({
    inputData,
    comparator,
    filterName,
    filterProfile,
    filterRol,
    filterTechnology,
    filterTeam
  }) {

    /* 
      InputData = {
        id: faker.datatype.uuid(),
        name: String,
        role: [],
        team: [],
        tecnologies: []
      }

    */

    const stabilizedThis = inputData.map((el, index) => [el, index]);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  
    inputData = stabilizedThis.map((el) => el[0]);
  
    if (filterName) {
      inputData = inputData.filter(
        (profile) =>
          profile.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }

  
    if (filterRol !== '') {
        inputData = inputData.filter((profile) =>
        profile.role === filterRol
      );
    }
  
  
    return inputData;
  }