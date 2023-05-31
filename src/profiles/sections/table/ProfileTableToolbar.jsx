import { Autocomplete, Button, InputAdornment, Stack, TextField } from '@mui/material'
import React from 'react'
import { Iconify } from '../../../common/components/Iconify/Iconify'

export const ProfileTableToolbar = ({
  isFiltered,
  filterName,
  filterRol,
  filterTechnology,
  filterMember,
  onFilterByName,
  onFilterByRol,
  onFilterByMember,
  onFilterByTechnology,
  onResetFilter,
  optionsRoles,
  optionsTechnologies,
  optionsMembers
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
        limitTags={2}
        id="roles"
        options={optionsRoles.map((rol) => rol.name)}
        defaultValue={[ ]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Roles" placeholder="Roles" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={2}
        id="teams"
        options={optionsMembers.map((team) => team.name)}
        defaultValue={[ ]}
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Miembros" placeholder="Miembros" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={2}
        id="technologies"
        options={optionsTechnologies.map((technology) => technology.name)}
        defaultValue={[ ]}
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Tecnologías" placeholder="Tecnología" sx={{textTransform: 'capitalize'}}/>
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
