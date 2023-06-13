import { Autocomplete, Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import React from 'react'
import { CustomAutocomplete } from '../../../common/components/Form/CustomAutocomplete'
import { Iconify } from '../../../common/components/Iconify/Iconify'

export const ConfigTeamTableToolbar = ({
    filterName,
    filterSympathy,
    onFilterByName,
    optionsRoles,
    optionsKnowledges,
    optionsTools
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
        id="roles"
        freeSolo
        readOnly
        options={optionsRoles}
        defaultValue={optionsRoles.map((rol) => rol.name)}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Roles" placeholder="Roles" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="knowledges"
        freeSolo
        readOnly
        options={optionsKnowledges}
        defaultValue={optionsKnowledges.map((knowledge) => knowledge.name)}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Conocimientos" placeholder="Conocimientos" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="tools"
        freeSolo
        readOnly
        options={optionsTools}
        defaultValue={optionsTools.map((tool) => tool.name)}
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Tecnologías" placeholder="Tecnologías" sx={{textTransform: 'capitalize'}}/>
        )}
      />

    </Stack>
  )
}
