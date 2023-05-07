import { Stack, Typography, Checkbox} from '@mui/material'
import React from 'react'
import '../../../styles.css'

export const TableSelectedAction = ({ 
    action,
    rowCount,
    numSelected,
    onSelectAllRows,
    sx,
    ...other
 }) => {

    if (!numSelected) {
    return null;
    }
    
    return (
        <Stack 
            direction="row"
            alignItems="center"
            sx={{
                pl: 1,
                pr: 2,
                top: 0,
                left: 0,
                width: 1,
                zIndex: 9,
                height: 58,
                position: 'absolute',
                bgcolor: 'primary.lighter',
    
                ...sx,
            }}
            {...other}
        >
            <Checkbox 
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={(event) => onSelectAllRows(event.target.checked)}
            />

            <Typography
                    variant="subtitle1"
                    sx={{
                    ml: 2,
                    flexGrow: 1,
                    color: 'primary.main',  
                    }}
                >
                    {numSelected} seleccionados
            </Typography>
            {action && action}
        </Stack>
    )
}
