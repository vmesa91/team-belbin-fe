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

      <Box sx={ {  display: 'flex', flexDirection: 'column', 'align-items': 'center'} } >
        <Stack spacing={3} sx={{ px: 3 , display: 'flex', flexDirection: 'row', 'align-items': 'center', flexWrap: 'wrap'} }>
            <CustomTextField name="name" label="Nombre"/>

            <CustomSelect
                    name='dataOption'
                    size="small"
                    label="Tipo de Dato">
                    {dataOptions.map((option) => (
                        <MenuItem
                        key={option._id}
                        value={option.label}
                        >
                          {option.label}
                      </MenuItem>
                    ))}
            </CustomSelect>
        </Stack>
        
        <Stack sx={ { padding: 3 } }>
            <CustomSwitch  name="activation" label="Activación"/>
        </Stack>

        <Stack sx={ { display: 'flex' , flexDirection: 'row-reverse' , justifyContent: 'space-between', padding: 3 } } >
            <Button  variant="outlined" color="inherit" onClick={onCancel}>
              Cancelar
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Añadir
            </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  )
}
