import { Box, FormControlLabel, TablePagination } from '@mui/material'
import React from 'react'

export const TablePaginationCustom = ({ 
    sx,
    ...other }) => {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
        <TablePagination rowsPerPageOptions={[0]} component="div" {...other} />
    </Box>
  )
}
