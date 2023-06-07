import { Autocomplete, Button, InputAdornment, Stack, TextField } from '@mui/material'
import React from 'react'
import { Iconify } from '../../../common/components/Iconify/Iconify'

export const MemberTableToolbar = ({
  isFiltered,
  filterName,
  filterProfile,
  filterTeam,
  filterLanguage,
  onFilterByName,
  onFilterByProfile,
  onFilterByTeam,
  onFilterByLanguage,
  onResetFilter,
  optionsProfiles,
  optionsTeams,
  optionsLanguages
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
        filterSelectedOptions
        onChange={onFilterByProfile}
        options={optionsProfiles}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Perfiles" placeholder="Perfiles" value={filterProfile} sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="teams"
        filterSelectedOptions
        onChange={onFilterByTeam}
        options={optionsTeams}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Equipos" placeholder="Equipos" value={filterTeam} sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="languages"
        filterSelectedOptions
        onChange={onFilterByLanguage}
        options={optionsLanguages}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Idiomas" placeholder="Idiomas" value={filterLanguage} sx={{textTransform: 'capitalize'}}/>
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
