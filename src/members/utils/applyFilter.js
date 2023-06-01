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
          const { profiles } = member
          return profiles.find( (profile) => filterProfile.find(( fp ) => (fp === profile.name) ? true : false) )
        } 
      );
    }

    if (filterTeam.length > 0) {
       inputData = inputData.filter((member) => {
          const { teams } = member
          return teams.find( (team) => filterTeam.find(( ft ) => (ft === team.name) ? true : false) )
        } 
      );
    }

    if (filterLanguage.length > 0) {

      inputData = inputData.filter((member) => {
          const { languages } = member
          return languages.find( (language) => filterLanguage.find(( fl ) => (fl === language.name) ? true : false) )
        } 
      ); 
    }


    return inputData;
  }