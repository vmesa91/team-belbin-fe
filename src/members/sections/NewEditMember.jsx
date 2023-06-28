// @mui
import { Box, Card, Divider, Stack, Typography } from "@mui/material"

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
import { useEffect, useMemo, useState } from "react";
import { PATH_HOME } from "../../home/routes/paths"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createMember, updateMember } from "../../redux/store/members/memberThunk";
import { filterMembersList } from "../utils/filterMembersList";

export const NewEditMember = ({ isEdit=false , currentMember }) => {
   
    const navigate = useNavigate()
    const dispatch = useDispatch()

     // Comprobaciones
  const NewMemberSchema = Yup.object().shape({
    user: Yup.string().required('El usuario es requerido'),
    profile: Yup.mixed().required('El perfil es requerido'),
    expertise: Yup.array().min(1, 'Es requerido al menos valorar 1 tecnología'),
    colleagues: Yup.array().min(1, 'Es requerido al menos valorar 1 compañero'),
    knowledges: Yup.array().min(2, 'Es requerido al menos 2 conocimientos'),
    belbinRol: Yup.array().min(2, 'Es requerido al menos 2 roles de Belbin'),
    language: Yup.array().min(1, 'Es requerido al menos 1 idioma'),
  })

    const { users } = useSelector( state => state.userStore )
    const { tools, knowledges } = useSelector( state => state.dataStore )
    const { profiles } = useSelector( state => state.profileStore )
    const { members } = useSelector( state => state.memberStore )
    
    const defaultValues = useMemo(
        () => ({
          user: currentMember?.user || '',
          profile: currentMember?.profile || null,
          expertise: currentMember?.expertise || [],
          colleagues: currentMember?.colleagues || [],
          knowledges: currentMember?.knowledges || [],
          belbinRol: currentMember?.belbinRol || [],
          language: currentMember?.language || [],
        }),
        [ currentMember ] 
      )
        
    const  methodsForm = useForm({ 
      resolver: yupResolver(NewMemberSchema),
      defaultValues })     
   
    const [listTools, setListTools] = useState(tools)
  
    const { reset, watch, setValue, handleSubmit , formState: { isSubmitting } } = methodsForm
  
    const values = watch()

    const filterListmember = filterMembersList(members)

    useEffect(() => {
        if (isEdit && currentMember) {
          reset(defaultValues);
        }
        if (!isEdit) {
          reset(defaultValues);
        }
      }, [isEdit, currentMember]) 


    useEffect(() => {
    if (values?.profile != null) {
        const profile = profiles.find( (profile) => profile._id === values.profile._id)
        setListTools( profile.tools )
      } 
      }, [values.profile]) 


    const onSubmit = (data) => {

      if (isEdit){
        const { _id } = currentMember
        dispatch(updateMember(data, _id))
      }else{ 
        dispatch(createMember(data))
      }
      reset();
      navigate(PATH_HOME.dashboard);

    }

  return (
    <FormProvider methods={methodsForm} onSubmit={handleSubmit(onSubmit)}>

<Card sx={{ p: 3, m: 4, display: 'grid', gridTemplateRows: '1fr 1fr 1fr', gap: '20px', padding: '4%'}}>
    <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
        <Typography variant="title" sx={{ color: 'text.secondary' }}>
            Nombre y Apellidos
        </Typography>
        <CustomSelect native name="user" label="Selecciona un usuario activo">
            <option value="" />
            {users.map((usr) => (
                <option key={usr._id} label={usr.name + ' ' +  usr.surname} disabled={ filterListmember.find( fl => fl._id === usr._id ) ? true : false }>{usr._id}</option>
            ))}
        </CustomSelect>
    </Box>

    <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
        <Typography variant="title" sx={{ color: 'text.secondary' }}>
            Añadir Roles de Belbin
        </Typography>
        <CustomAutocomplete
            name="belbinRol"
            label="Selecciona uno o varios roles"
            filterSelectedOptions
            multiple
            options={dataRolesBelbin.map(role => ({ 'label': role.name, '_id': role._id, 'group': role.group }))}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            groupBy={(option) => option.group} 
            sx={{ width: '450%' }}
        />
    </Box>

    <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
        <Typography variant="title" sx={{ color: 'text.secondary' }}>
            Añadir Perfil
        </Typography>
        <CustomAutocomplete
            name="profile"
            label="Selecciona un perfil"
            options={profiles}
            getOptionLabel={(option)=>(option.name?option.name:'')}
            sx={{ width: '450%' }}
        />
    </Box> 
</Card>

        <Card sx={{ p: 3, m: 4, display: 'flex', flexDirection: 'column', padding: '4%'}}>
            < ScoreTools tools={listTools} />
        </Card>

        <Card sx={{ p: 3, m: 4, display: 'flex', flexDirection: 'column', padding: '4%'}}>
           < ScoreColleagues users={users} />
        </Card>

        <Card sx={{ p: 3, m: 4, display: 'flex', flexDirection: 'column', padding: '4%'}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}} >
                    <Typography variant="title" sx={{ color: 'text.secondary' }}>
                        Añadir Conocimiento/s
                    </Typography>
                    <CustomAutocomplete
                        name="knowledges"
                        label="Selecciona uno o varios conocimientos"
                        multiple
                        filterSelectedOptions
                        options={knowledges}
                        getOptionLabel={(option)=>(option.name?option.name:'')}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        sx={{ width: '350px' }}
                    />
                </Box>

                <Box sx={{ p: 2, m: 2, display: 'flex', padding: '6', flexWrap: 'wrap'}}>
                  <Typography variant="title" sx={{ color: 'text.secondary' }}>
                          Añadir Idioma/s
                  </Typography>
                  < CustomAutocomplete
                      name="language"
                      label="Selecciona uno o varios idiomas"
                      filterSelectedOptions
                      multiple
                      options={dataCountries}
                      getOptionLabel={(option)=>(option.name?option.name:'')}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      sx={{ width: '450px' }}
                  />
               </Box>

            </Stack>

        </Card>

    <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        {!isEdit ? 'Crear Miembro' : 'Guardar Cambios'}
        </LoadingButton>
    </Stack>
  </FormProvider>
  )
}
