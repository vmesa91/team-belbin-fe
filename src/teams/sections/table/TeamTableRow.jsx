import { Avatar, Button, Checkbox, Divider, IconButton, Link, MenuItem, Stack, TableCell, TableRow } from "@mui/material"
import { Iconify } from "../../../common/components/Iconify/Iconify"
import { MenuPopover } from "../../../common/components/MenuPopover/MenuPopover"
import { useState } from "react"
import { ConfirmDialog } from "../../../common/components/ConfirmDialog/ConfirmDialog"
import { useSelector } from "react-redux"
import { summaryOptions } from "../../../common/utils/summaryOptions"

export const TeamTableRow = ({
    row,
    selected,
    onSelectRow,
    onViewRow,
    onEditRow,
    onDeleteRow,
}) => {

  const { name, members, language } = row

  const getProfiles = () => {
     return members.map( (member) => member.profile  )
  }

  const profiles = getProfiles()

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
            <Iconify width={40} icon="flat-color-icons:opened-folder"/>

            <div>
              <Link
                noWrap
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                {name}
              </Link>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{ summaryOptions('profileList', profiles) }</TableCell>
        <TableCell align="left">{summaryOptions('members', members)}</TableCell>
        <TableCell align="left">{summaryOptions('language', language)}</TableCell>

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


// Get Profiles

const getProfiles = ( members , profiles) => {
   
  const profilesList = members.map( (member) => {
     return profiles.find( (profile) => profile._id === member.profile )
  } )

 return profilesList
 
}