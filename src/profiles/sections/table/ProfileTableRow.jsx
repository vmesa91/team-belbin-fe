import { Avatar, Button, Checkbox, Divider, IconButton, Link, MenuItem, Stack, TableCell, TableRow, Typography } from "@mui/material"
import { Iconify } from "../../../common/components/Iconify/Iconify"
import { MenuPopover } from "../../../common/components/MenuPopover/MenuPopover"
import { useState } from "react"
import { ConfirmDialog } from "../../../common/components/ConfirmDialog/ConfirmDialog"
import { summaryOptions } from "../../../common/utils/summaryOptions"
import { CustomAvatar } from "../../../common/components/CustomAvatar/CustomAvatar"


export const ProfileTableRow = ({
    row,
    selected,
    onSelectRow,
    onEditRow,
    onDeleteRow,
}) => {

  const { members, name, roles, tools, id } = row

  const [openConfirm, setOpenConfirm] = useState(false)

  const [openPopover, setOpenPopover] = useState(null)

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = () => {
    setOpenPopover(null)
  }

  return (
   <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={name} />
            <Typography variant="subtitle2" color="common.blue" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left"> { summaryOptions('roles', roles) } </TableCell>
        <TableCell align="left"> { summaryOptions('members', members) }  </TableCell>
        <TableCell align="left">{ summaryOptions('tools', tools) }</TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

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
        content="¿Estás seguro que desea eliminarlo?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />
   </>
  )
}
