import { Skeleton, Stack, TableCell, TableRow } from "@mui/material"

export const TableSkeleton = ({ ...other }) => {
  return (
    <TableRow {...other}>
        <TableCell colSpan={12}>
            <Stack spacing={3} direction="row" alignItems="center">
                 <Skeleton 
                    variant="rectangular"
                    width={40}
                    height={40}
                    sx={{ borderRadius: 1, flexShrink: 0 }}
                 />
            </Stack>
        </TableCell>
    </TableRow>
  )
}
