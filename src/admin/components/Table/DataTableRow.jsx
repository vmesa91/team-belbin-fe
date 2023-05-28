
import { sentenceCase } from 'change-case';
import { Button, IconButton, MenuItem, Stack, Checkbox, TableCell, TableRow, Typography } from '@mui/material'
import { useState } from 'react'
import { MenuPopover } from '../../../common/components/MenuPopover/MenuPopover';
import { ConfirmDialog } from '../../../common/components/ConfirmDialog/ConfirmDialog';
import { Iconify } from '../../../common/components/Iconify/Iconify';
import { Label } from '../../../common/components/Label/Label'

export const DataTableRow = ({
    row,
    selected,
    onSelectRow,
    onDeleteRow,
}) => {

    const { name, activation } = row;

    const status = activation ? 'Active' : 'Inactive'   

    const [openConfirm, setOpenConfirm] = useState(false);
  
    const [openPopover, setOpenPopover] = useState(null);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
      };
    
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
      };
    
    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
      };
    
    const handleClosePopover = () => {
        setOpenPopover(null);
      };

  return (


    <>
    
    <TableRow  hover selected={selected}>
       <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow}/>
       </TableCell>

       <TableCell>
           <Stack direction="row" alignItems="center" spacing={2}>
               <Typography> {name} </Typography>
           </Stack>
       </TableCell>

       <TableCell align="center">
         <Label
           variant="soft"
           color={
             (status === 'Inactive' && 'error') ||
             'success'
           }
           sx={{ textTransform: 'capitalize' }}
         >
           {status ? sentenceCase(status) : ''}
         </Label>
       </TableCell>

       <TableCell align="right">
         <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
           <Iconify icon="eva:more-vertical-fill" />
         </IconButton>
       </TableCell>
       </TableRow>

       <MenuPopover
           open={openPopover}
           onClose={handleClosePopover}
           arrow="right-top"
           sx={{ width: 140 }}
       >
           <MenuItem
               onClick={() => {
                   handleOpenConfirm();
                   handleClosePopover();
               }}
               sx={{ color: 'error.main' }}
           >
           <Iconify icon="eva:trash-2-outline" />
                Eliminar
           </MenuItem>
       </MenuPopover>

       <ConfirmDialog
       open={openConfirm}
       onClose={handleCloseConfirm}
       title="Eliminar"
       content="¿Estás seguro de que desea eliminarlo?"
       action={
         <Button variant="contained" color="error" onClick={onDeleteRow}>
           Eliminar
         </Button>
       }
     />
    </>
    
  )
}
