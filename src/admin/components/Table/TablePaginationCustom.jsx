import { Box, TablePagination } from '@mui/material'
import React from 'react'

export const TablePaginationCustom = ({ 
    sx,
    ...other }) => {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
        <TablePagination rowsPerPageOptions={[3, 6]} component="div" {...other} />
    </Box>
  )
}
