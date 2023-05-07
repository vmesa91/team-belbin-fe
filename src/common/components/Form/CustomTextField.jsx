// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

export const CustomTextField = ({ name, helperText, ...other }) => {

  const { control } = useFormContext()  
  return (
    <Controller 
        name={ name }
        control={ control }
        render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              value={ field.value === 'number' && field.value === 0 ? '' : field.value}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...other}
            />
          )}

    />
  )
}
