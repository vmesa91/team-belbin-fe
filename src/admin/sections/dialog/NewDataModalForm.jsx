import { useForm } from "react-hook-form";
import { FormProvider } from "../../../common/components/Form/FormProvider";
import { CustomTextField } from "../../../common/components/Form/CustomTextField";
import { Box, Button, MenuItem, Stack } from "@mui/material";
import { CustomSwitch } from "../../../common/components/Form/CustomSwitch";
import { LoadingButton } from "@mui/lab";
import { CustomSelect } from "../../../common/components/Form/CustomSelect";
import { dataOptions } from '../../config/dataOptions' 


export const NewDataModalForm = ({ onCancel }) => {

    const methods = useForm({})

    const {
        reset,
        watch,
        control,
        handleSubmit,
        formState: { isSubmitting },
      } = methods


    const onSubmit = (data) => {
        console.log('Creado', data)
    }


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
        <Stack spacing={3} sx={{ px: 3 }}>
            <CustomTextField name="name" label="Nombre"/>
        </Stack>
        
        <CustomSelect
                name='dataOption'
                size="small"
                label="Tipo de Dato"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 160 } }}>
                {dataOptions.map((data) => (
                    <MenuItem
                    key={dataOptions.id}
                    value={dataOptions.label}
                    >
                    {data.label}
                  </MenuItem>
                ))}
        </CustomSelect>

        <CustomSwitch name="activation" label="Activación"/>

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancelar
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Añadir
        </LoadingButton>
    </FormProvider>
  )
}
