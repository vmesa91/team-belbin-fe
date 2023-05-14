import { Button, InputAdornment, Stack, TextField } from '@mui/material'
import React from 'react'
import { Iconify } from '../../../common/components/Iconify/Iconify'

export const DataTableToolbar = ({ 
    filterName,
    onFilterName,
    isFiltered,
    onResetFilter }) => {

  return (
    <Stack 
      spacing={1}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 2 }}
    >
        <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Buscar..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          )
        }}
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
