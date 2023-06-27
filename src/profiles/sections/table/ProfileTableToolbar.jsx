import { Autocomplete, Button, InputAdornment, Stack, TextField } from '@mui/material'
import React from 'react'
import { Iconify } from '../../../common/components/Iconify/Iconify'

export const ProfileTableToolbar = ({
  isFiltered,
  filterName,
  filterRol,
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
        filterSelectedOptions
        onChange={onFilterByRol}
        options={optionsRoles}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Roles" placeholder="Roles" value={filterRol} sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="members"
        filterSelectedOptions
        onChange={onFilterByMember}
        options={optionsMembers}
        getOptionLabel={(option) => option.user.name + ' ' +  option.user.surname}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Miembros" placeholder="Miembros" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={2}
        id="technologies"
        filterSelectedOptions
        onChange={onFilterByTechnology}
        options={optionsTechnologies}
        getOptionLabel={(option) => option.user.name}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Tecnologías" placeholder="Tecnología" value={filterMember} sx={{textTransform: 'capitalize'}}/>
        )}
      />
      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Borrar
        </Button>
      )}
    </Stack>
  )
}
