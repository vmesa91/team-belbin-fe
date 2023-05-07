import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { EmptyContent } from '../../../common/components/EmptyContent/EmptyContent'

export const TableNoData = ({ isNotFound }) => {
  return (
    <TableRow>
        { isNotFound ? (
            <TableCell colSpan={12}>
                 <EmptyContent 
                    title="No existen datos"
                    sx={{
                      '& span.MuiBox-root': { height: 160 },
                    }}
                 />
            </TableCell>  
        ) : 
        (
            <TableCell colSpan={12} sx={{ p: 0 }}/>
        )}
    </TableRow>
  )
}
