// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Box,
  Chip,
  Select,
  Checkbox,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

export const CustomSelect = ({ name, native, children, helperText, maxHeight = 400, ...other }) => {

  const { control } = useFormContext();

  return (
   <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                select
                fullWidth
                SelectProps={{
                native,
                MenuProps: {
                    PaperProps: {
                    sx: {
                        ...(!native && {
                        px: 1,
                        maxHeight: maxHeight ,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                        },
                        }),
                    },
                    },
                },
                sx: { textTransform: 'capitalize' },
                }}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...other}   
            >

                {children}  
                
            </TextField>

        )}  
   >

   </Controller>
  )
}
