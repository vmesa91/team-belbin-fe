import { TableCell, TableRow } from '@mui/material';
import React from 'react'

export const TableEmptyRows = ({ emptyRows, height }) => {
    if (!emptyRows) {
        return null;
    }
  return (
    <TableRow sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}>
        <TableCell colSpan={9}/>
    </TableRow>
  )
}
