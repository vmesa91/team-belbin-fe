
import { TableCell, TableRow } from '@mui/material';

export const TableEmptyRows = ({ emptyRows }) => {

    const height = 72;
    
    if (!emptyRows) {
      return null;
    }
  
    return (
      <TableRow
        sx={{
          ...(height && {
            height: height * emptyRows,
          }),
        }}
      >
        <TableCell colSpan={9} />
      </TableRow>
    );
  }
  
