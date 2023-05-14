import { FormControlLabel, FormHelperText, Switch } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"


export const CustomSwitch = ({ name, helperText, ...other }) => {

  const { control } = useFormContext()
  return (
    <Controller 
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
            <FormControlLabel control={<Switch {...field} checked={field.value} />} {...other} />
            {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  )
}
