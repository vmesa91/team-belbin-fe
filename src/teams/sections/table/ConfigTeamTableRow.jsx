import { Avatar, Button, Checkbox, Divider, IconButton, Link, MenuItem, Stack, TableCell, TableRow } from "@mui/material"
import { Iconify } from "../../../common/components/Iconify/Iconify"
import { MenuPopover } from "../../../common/components/MenuPopover/MenuPopover"
import { useState } from "react"
import { ConfirmDialog } from "../../../common/components/ConfirmDialog/ConfirmDialog"
import { summaryOptions } from "../../../common/utils/summaryOptions"


export const ConfigTeamTableRow = ({
    row,
    selected,
    onSelectRow,
    onViewRow,
    onEditRow,
    onDeleteRow,
}) => {

  const { user, profile, expertise, colleagues, knowledges, language, belbinRol, team } = row

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
            <Avatar name={user.name} src={user.image}/>

            <div>
              <Link
                noWrap
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                { user.name + ' ' + user.surname }
              </Link>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{summaryOptions( 'profile', profile )}</TableCell>
        <TableCell align="left">{summaryOptions( 'team', team )}</TableCell>
        <TableCell align="left">{summaryOptions( 'language', language )}</TableCell>
      </TableRow>

   </>
  )
}
