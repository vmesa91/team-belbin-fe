// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Stack, Button, Divider, Typography, InputAdornment, MenuItem, Rating } from '@mui/material';
import { Iconify } from '../../../common/components/Iconify/Iconify'
import { CustomSelect } from '../../../common/components/Form/CustomSelect';
// mocks
import { useCallback, useEffect, useState } from 'react';


export const ScoreTools = ( { tools } ) => {


    const { control, setValue, watch, resetField } = useFormContext();
    const [disabledTools, setDisabledTools] = useState([''])

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'expertise',
    });

    const values = watch();

    const [listTool, setlistTool] = useState([values.expertise])
    
    useEffect(() => {
        if (values.expertise.length > 0) {
            values.expertise.map( ( exp ) => {
                const { tool } = exp
                setDisabledTools( [...disabledTools], tool )
            } )
        }
        }, [values.expertise]) 

    const handleAdd = () => {
         append({
            tool: '',
            score: 0
            });
    } 

    const handleRemove = (index) => {
        remove(index);
      };

    const handleClearTecnology = () => {
        (index) => {
            resetField(`expertise[${index}].tool`);
            resetField(`expertise[${index}].score`);
          },
          [resetField]
    }
    
    const handleSelectTecnology = useCallback(
        (index, option) => {
            const tool = tools.find((tool) => tool.name === option.name)
          setValue(
            `expertise[${index}].tool`,
            tool
          );
        },
        [setValue, values.expertise]
      );

    useEffect(() => {
        setlistTool(values.expertise)
    }, [values.expertise])

    const handleSelectScore = useCallback(
        ( index, { target } ) => {
            setValue(
                `expertise[${index}].score`,
                target.value
            ); 
        },
        [setValue, values.expertise]
    );
    
      
    return (

    <Stack sx={{ display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
       <Typography variant="title" sx={{ color: 'text.secondary' }}>
            Añadir Tecnología/s
        </Typography>


        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            { fields.map((item, index) => (
                <Stack key={item._id} alignItems="flex-end" spacing={1.5}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                        <CustomSelect
                            name={`expertise[${index}].tool`}
                            size="small"
                            label="Selecciona una o varias tecnologías"
                            InputLabelProps={{ shrink: true }}
                            sx={{ minWidth: { md: 160 } }}
                            >
                                <MenuItem
                                    key={0}
                                    value="None"
                                    onClick={() => handleClearTecnology(index)}
                                    sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                                >
                                    None
                                </MenuItem>

                                <Divider />

                                {tools.map((tool) => (
                                    <MenuItem
                                        key={tool._id}
                                        value={tool._id}
                                        disabled={ listTool.find( fl => fl.tool === tool._id ) ? true : false }
                                        onClick={() => handleSelectTecnology(index, tool)}
                                    >
                                        {tool.name}
                                    </MenuItem>
                                ))}

                        </CustomSelect>

                        <Rating size="large" onChange={ (data) => handleSelectScore(index, data)}/>

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
