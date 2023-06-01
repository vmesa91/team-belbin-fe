
// @mui
import { Card, Container, Divider, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"

// Config
import { dataRolesBelbin } from '../config/configTableMembers'
import { dataCountries } from '../../_mock/dataCountries'
import { FormProvider } from "../../common/components/Form/FormProvider";
import { useForm } from "react-hook-form";
import { CustomAutocomplete } from "../../common/components/Form/CustomAutocomplete";
import { LoadingButton } from "@mui/lab";
import { ScoreTools } from "../sections/score/ScoreTools";
import { CustomSelect } from "../../common/components/Form/CustomSelect";
import { ScoreColleagues } from "../sections/score/ScoreColleagues";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { PATH_MEMBER } from "../../home/routes/paths"
import { createMember } from "../../redux/store/members/memberThunk";

export const NewEditMember = ({ isEdit=false , currentMember }) => {
   
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const defaultValues = useMemo(
        () => ({
          user: currentMember?.user || '',
          profiles: currentMember?.profiles || [],
          expertise: currentMember?.expertise || [],
          colleagues: currentMember?.colleagues || [],
          knowledges: currentMember?.knowledges || [],
          belbinRol: currentMember?.belbinRol || [],
          language: currentMember?.language || [],
        }),
        [ currentMember ] 
      )
      
    const  methodsForm = useForm({ defaultValues }) 

    const { users } = useSelector( state => state.userStore )
    const { tools, knowledges } = useSelector( state => state.dataStore )
    const { profiles } = useSelector( state => state.profileStore )
    
  
    const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm
  
    const values = watch()

    useEffect(() => {
        if (isEdit && currentMember) {
          reset(defaultValues);
        }
        if (!isEdit) {
          reset(defaultValues);
        }
      }, [isEdit, currentMember]) 

    const onSubmit = (data) => {
      reset();
      dispatch(createMember(data))
      navigate(PATH_MEMBER.manageMembers);
    }

  return (
    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>
        <Card>
        <Stack sx={{ p: 3 , m: 4, display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}} >
            <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Nombre y Apellidos
            </Typography>

            < CustomSelect native
                name="user"
                label="Selecciona un usuario activo" sx={{ width: '450px' }}>
                <option value="" />
                    {users.map((usr) => (
                    <option key={usr.id} label={usr.name + ' ' +  usr.surname}>{usr.id}</option>
                    ))}
            </CustomSelect>
        </Stack>

        <Stack spacing={{ xs: 2, md: 5 }}
               direction={{ xs: 'column', md: 'row' }}
               divider={
                    <Divider
                    flexItem
                    orientation={'vertical'}
                    sx={{ borderStyle: 'dashed' }}
                    />
                }
                sx={{ p: 2 }}>
                <Stack sx={{ width: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="title" sx={{ color: 'text.secondary' }}>
                            Añadir Perfil/es
                    </Typography>
                    < CustomAutocomplete
                        name="profiles"
                        label="Selecciona uno o varios perfiles"
                        multiple
                        options={profiles}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: '350px' }}
                    />
                </Stack>
                </Stack> 

                <Stack sx={{ width: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="title" sx={{ color: 'text.secondary' }}>
                        Añadir Conocimiento/s
                        </Typography>
                        < CustomAutocomplete
                        name="knowledges"
                        label="Selecciona uno o varios conocimientos"
                        multiple
                        options={knowledges}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: '350px' }}
                        />
                    </Stack>
                </Stack> 
        </Stack> 

        < ScoreTools tools={tools}/>
        
        <Stack sx={{ p: 3 , m: 4 , display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
            <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Añadir Roles de Belbin
            </Typography>
            < CustomAutocomplete
            name="belbinRol"
            label="Selecciona uno o varios roles"
            multiple
            options={dataRolesBelbin}
            getOptionLabel={(option) => option.name}
            groupBy={ ( option ) => option.group }
            sx={{ width: '450px' }}
            />
        </Stack>

        <ScoreColleagues users={users}/>

        <Stack sx={{ p: 3 , m: 4 , display: 'flex' , flexDirection: 'row' ,  justifyContent: 'space-around'}}>
            <Typography variant="title" sx={{ color: 'text.secondary' }}>
                    Añadir Idioma/s
            </Typography>
            < CustomAutocomplete
            name="language"
            label="Selecciona uno o varios idiomas"
            multiple
            options={dataCountries}
            getOptionLabel={(option) => option.name}
            sx={{ width: '450px' }}
            />
        </Stack>
    </Card>

    <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        {!isEdit ? 'Crear Miembro' : 'Guardar Cambios'}
        </LoadingButton>
        <LoadingButton type="submit" variant="outlined" sx={{ marginTop: '0 !important' }}>
            Cancelar
        </LoadingButton>
    </Stack>
  </FormProvider>
  )
}
