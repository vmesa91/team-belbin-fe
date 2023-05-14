import { Autocomplete, Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import React from 'react'
import { CustomAutocomplete } from '../../../common/components/Form/CustomAutocomplete'
import { Iconify } from '../../../common/components/Iconify/Iconify'

export const ConfigTeamTableToolbar = ({
    isFiltered,
    filterName,
    filterSympathy,
    filterProfile,
    filterKnowledge,
    filterTechnology,
    onFilterByName,
    onFilterBySympathy,
    onFilterByProfile,
    onFilterByKnowledge,
    onFilterByTechnology,
    onResetFilter,
    optionsSympathies,
    optionsProfiles,
    optionsKnowledges,
    optionsTechnologies
}) => {

  return (
    <Stack
    spacing={2}
    alignItems="center"
    direction={{
      xs: 'column',
      md: 'row',
    }}
    sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterByName}
        placeholder="Buscar..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="profiles"
        freeSolo
        readOnly
        options={optionsProfiles.map((profile) => profile.name)}
        defaultValue={[ optionsTechnologies[1].name, optionsTechnologies[4].name ]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Perfiles" placeholder="Perfiles" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="knowledges"
        freeSolo
        readOnly
        options={optionsKnowledges.map((knowledge) => knowledge.name)}
        defaultValue={[ optionsKnowledges[1].name, optionsKnowledges[4].name ]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Conocimientos" placeholder="Conocimientos" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="technologies"
        freeSolo
        readOnly
        options={optionsTechnologies.map((technology) => technology.name)}
        defaultValue={[ optionsTechnologies[1].name, optionsTechnologies[4].name ]}
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Tecnologías" placeholder="Tecnologías" sx={{textTransform: 'capitalize'}}/>
        )}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  )
}
