// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Stack, Button, Divider, Typography, InputAdornment, MenuItem, Rating } from '@mui/material';
import { Iconify } from '../../../common/components/Iconify/Iconify'
import { CustomSelect } from '../../../common/components/Form/CustomSelect';
// mocks
import { dataTechnologies } from '../../../_mock/dataTechnologies'


export const ScoreTecnology = () => {


    const { control, setValue, watch, resetField } = useFormContext();

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'items',
    });

    const values = watch();

    const handleAdd = () => {
         append({
            tecnologyName: '',
            score: 0
            });
    } 

    const handleRemove = (index) => {
        remove(index);
      };

    const handleClearTecnology = () => {
        console.log('Clear')
    }
    
    const handleSelectTecnology = ( index, name ) => {
        console.log(name)
    }
    
    return (

    <Stack sx={{ display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
       <Typography variant="title" sx={{ color: 'text.secondary' }}>
            Añadir Tecnología/s
        </Typography>


        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            { fields.map((item, index) => (
                <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                        <CustomSelect
                            name={`items[${index}].tecnologyName`}
                            size="small"
                            label="Selecciona una o varias tecnologías"
                            InputLabelProps={{ shrink: true }}
                            sx={{ maxWidth: { md: 160 } }}
                        >
                                <MenuItem
                                    value=""
                                    onClick={() => handleClearTecnology(index)}
                                    sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                                >
                                    None
                                </MenuItem>

                                <Divider />

                                {dataTechnologies.map((tecnology) => (
                                    <MenuItem
                                        key={tecnology.id}
                                        value={tecnology.name}
                                        onClick={() => handleSelectTecnology(index, tecnology.name)}
                                    >
                                        {tecnology.name}
                                    </MenuItem>
                                ))}

                        </CustomSelect>

                        <Rating />

                        <Button
                            size="small"
                            color="error"
                            startIcon={<Iconify icon="eva:trash-2-outline" />}
                            onClick={() => handleRemove(index)}
                            >
                            Eliminar
                            </Button>
                    </Stack>
                </Stack>
            )) }
        </Stack>




    <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
    >
        <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAdd}
            sx={{ flexShrink: 0 }}
        >
            Añadir Tecnología
        </Button>

        <Stack
            spacing={2}
            justifyContent="flex-end"
            direction={{ xs: 'column', md: 'row' }}
            sx={{ width: 1 , backgroundColor: 'yellow' }}
        >


        </Stack>


    </Stack>
    </Stack>    
        

  )
}
