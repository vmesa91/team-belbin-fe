// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
import { Iconify } from '../../../common/components/Iconify/Iconify'
import { CustomSelect } from '../../../common/components/Form/CustomSelect';
// mocks
import { members } from '../../../_mock/dataMembers'
import { CustomRating } from '../../../common/components/Rating/CustomRating';


export const ScoreColleagues = () => {


    const { control, setValue, watch, resetField } = useFormContext();

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'items',
    });

    const values = watch();

    const handleAdd = () => {
         append({
            name: '',
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
           Añadir Red Compañeros/as 
        </Typography>


        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            { fields.map((item, index) => (
                <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                        <CustomSelect
                            name={`items[${index}].name`}
                            size="small"
                            label="Añade una red de compañeros/as"
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

                                {members.map((member) => (
                                    <MenuItem
                                        key={member.id}
                                        value={member.name}
                                        onClick={() => handleSelectTecnology(index, member.name)}
                                    >
                                        {member.name}
                                    </MenuItem>
                                ))}

                        </CustomSelect>

                        <CustomRating />

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
            Añadir Compañer@
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
