// Aplicar filtro
export function applyFilter({
    inputData,
    filterName,
    filterProfile,
    filterTeam,
    filterLanguage
  }) {

    if (filterName) {
      inputData = inputData.filter(
        (member) => { 
          const { user } = member
          return user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        }
      );
    }

    if (filterProfile.length > 0) {
       inputData = inputData.filter((member) => {
          const { profile } = member
          return filterProfile.find(( fp ) => (fp === profile.name) ? true : false) 
        } 
      );
    }

    if (filterTeam.length > 0) {
       inputData = inputData.filter((member) => {
          const { teams } = member
          return teams?.find( (team) => filterTeam.find(( ft ) => (ft === team.name) ? true : false) )
        } 
      );
    }

    if (filterLanguage.length > 0) {

      inputData = inputData.filter((member) => {
          const { language } = member
          
          return language.find( (l) => filterLanguage.find(( fl ) => (fl === l.name) ? true : false) )
        } 
      ); 
    }


    return inputData;
  }