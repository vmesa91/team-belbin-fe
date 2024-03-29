
import { TableCell, TableHead, TableRow, TableSortLabel , Checkbox, Box } from '@mui/material'

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export const TableHeadCustom = ({ 
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
 }) => {

  
  return (
    <TableHead sx={sx}>
        <TableRow>
          { onSelectAllRows && (
            <TableCell padding="checkbox">
                <Checkbox 
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={(event) => onSelectAllRows(event.target.checked)}
                />
            </TableCell>
          )}  

          {headLabel.map((headCell) => (
            <TableCell 
                key={headCell._id}
                align={headCell.align || 'left'}
                sortDirection={orderBy === headCell._id ? order : false}
                sx={{ width: headCell.width, minWidth: headCell.minWidth }}
                colSpan={3}
            >
              { onSort ? (
                <TableSortLabel
                hideSortIcon
                active={orderBy === headCell._id}
                direction={orderBy === headCell._id ? order : 'asc'}
                onClick={() => onSort(headCell._id)}
                
                sx={{ textTransform: 'capitalize', paddingRight: '29px'}}
                >
                  {headCell.label}

                  {orderBy === headCell._id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
        </TableCell>
          ))}
        </TableRow>
    </TableHead>
  )
}
