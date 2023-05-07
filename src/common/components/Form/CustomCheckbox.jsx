// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Checkbox,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

export const CustomCheckbox = ({ name, helperText, ...other }) => {
    const { control } = useFormContext();
    return (
        <Controller 
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControlLabel control={<Checkbox {...field} checked={field.value} />} {...other} />
        
                  {(!!error || helperText) && (
                    <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
                  )}
                </div>
              )}
        
        />
  )
}

