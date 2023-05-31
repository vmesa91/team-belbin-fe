// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
import { Iconify } from '../../../common/components/Iconify/Iconify'
import { CustomSelect } from '../../../common/components/Form/CustomSelect';
// mocks
import { members } from '../../../_mock/dataMembers'
import { CustomRating } from '../../../common/components/Rating/CustomRating';
import { useCallback, useState } from 'react';


export const ScoreColleagues = ( { users } ) => {


    const [ newUsers, setNewUser ] = useState(users)
    const [ selectUsers, setSelecetUsers ] = useState([])

    const { control, setValue, watch, resetField } = useFormContext();

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'colleagues',
    });

    const values = watch();

    const handleAdd = () => {
         append({
            user: '',
            score: 0
            });
    } 

    const handleRemove = (index) => {
        remove(index);
      };

    const handleClearColleagues = () => {
        (index) => {
            resetField(`tools[${index}].user`);
            resetField(`items[${index}].score`);
          },
          [resetField]
    }
    
    const handleSelectColleague = useCallback(
        (index, option) => {
            let updatedUsers = [...newUsers]
            let selectedUser = updatedUsers.find(user => user.id === option)
            selectedUser = { ...selectedUser, rating: 0 } // rating initial set to 0
    
            const selectedIndex = updatedUsers.findIndex(user => option === user.id)
            updatedUsers.splice(selectedIndex,1)
    
            setNewUser(updatedUsers)
            setSelecetUsers([...selectUsers, selectedUser])
    
            setValue(`colleagues[${index}].user`, selectedUser);
        },
        [setValue, newUsers, selectUsers]
    );

    const handleSelectScore = useCallback(
        (index, { target }) => {
            const selectedUsersCopy = [...selectUsers];
            selectedUsersCopy[index].rating = target.value;
    
            setSelecetUsers(selectedUsersCopy);
    
            setValue(`colleagues[${index}].score`, target.value);
        },
        [setValue, selectUsers]
    );
      
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
                            name={`colleagues[${index}].user`}
                            size="small"
                            label="Añade una red de compañeros/as"
                            InputLabelProps={{ shrink: true }}
                            sx={{ maxWidth: { md: 160 } }}
                        >
                                <MenuItem
                                    value=""
                                    onClick={() => handleClearColleagues(index)}
                                    sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                                >
                                    None
                                </MenuItem>

                                <Divider />

                                {users.map((user) => (
                                    <MenuItem
                                        key={user.id}
                                        value={user.id}
                                        onClick={() => handleSelectColleague(index, user.id)}
                                    >
                                        {user.name + ' ' + user.surname}
                                    </MenuItem>
                                ))}

                        </CustomSelect>

                        <CustomRating onChange={ (data) => handleSelectScore(index, data) }/>

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
