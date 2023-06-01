
import { TableCell, TableRow } from '@mui/material';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';


export const TableNoData = ({ isNotFound }) => {
    return (
      <TableRow>
        {isNotFound ? (
          <TableCell colSpan={12}>
            <EmptyContent
              title="No hay datos"
              sx={{
                '& span.MuiBox-root': { height: 160 },
              }}
            />
          </TableCell>
        ) : (
          <TableCell colSpan={12} sx={{ p: 0 }} />
        )}
      </TableRow>
    );
  }
  