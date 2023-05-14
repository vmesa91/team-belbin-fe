import { Autocomplete, Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import React from 'react'
import { CustomAutocomplete } from '../../../common/components/Form/CustomAutocomplete'
import { Iconify } from '../../../common/components/Iconify/Iconify'

export const TeamTableToolbar = ({
    isFiltered,
    filterName,
    filterProfile,
    filterMember,
    filterLanguage,
    onFilterByName,
    onFilterByProfile,
    onFilterByMember,
    onFilterByLanguage,
    onResetFilter,
    optionsProfiles,
    optionsMembers,
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
        options={optionsProfiles.map((profile) => profile.name)}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Perfiles" placeholder="Perfiles" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="members"
        options={optionsMembers.map((member) => member.name)}
        defaultValue={[]}
        sx={{ maxHeight: 120 , width: '500px'}}
        renderInput={(params) => (
          <TextField {...params} label="Miembros" placeholder="Miembros" sx={{textTransform: 'capitalize'}}/>
        )}
      />
      <Autocomplete
        multiple
        limitTags={3}
        id="languages"
        options={optionsLanguages.map((language) => language.name)}
        defaultValue={[]}
        readOnly
        sx={{ maxHeight: 120 , width: '500px' }}
        renderInput={(params) => (
          <TextField {...params} label="Idiomas" placeholder="Idiomas" sx={{textTransform: 'capitalize'}}/>
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
