import { useForm } from "react-hook-form";
import { FormProvider } from "../../../common/components/Form/FormProvider";
import { CustomTextField } from "../../../common/components/Form/CustomTextField";
import { Box, Button, MenuItem, Stack } from "@mui/material";
import { CustomSwitch } from "../../../common/components/Form/CustomSwitch";
import { LoadingButton } from "@mui/lab";
import { CustomSelect } from "../../../common/components/Form/CustomSelect";
import { dataOptions } from '../../config/dataOptions' 
import { createData } from "../../../redux/store/data/dataThunk";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";


export const NewDataModalForm = ({ onCancel }) => {

  const dispatch = useDispatch()
  const defaultValues = {
      name: '',
      dataOption: null,
      activation: false
    }

    const methods = useForm({ defaultValues })

    const {
        reset,
        watch,
        control,
        handleSubmit,
        formState: { isSubmitting },
      } = methods

    const values = watch()  
  
    const onSubmit = (data) => {
      dispatch(createData({...data}))
      onCancel()
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
                sx={{ maxWidth: { md: 160 } }}>
                {dataOptions.map((option) => (
                    <MenuItem
                    key={option.id}
                    value={option.label}
                    >
                      {option.label}
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
