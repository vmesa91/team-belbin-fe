
import { Box, Card, Container, MenuItem, Select, Snackbar, Stack, TextField, Typography } from "@mui/material"
// @mui
import { Helmet } from "react-helmet-async";
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs";
import { profiles } from '../../_mock/dataProfiles'
import { paramCase } from 'change-case';
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { FormProvider } from "../../common/components/Form/FormProvider";
import { useForm } from "react-hook-form";
import { CustomAutocomplete } from "../../common/components/Form/CustomAutocomplete";
import { LoadingButton } from "@mui/lab";
import { CustomTextField } from "../../common/components/Form/CustomTextField";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomSnackbar } from "../../common/components/SnackBar/CustomSnackbar";
import { useEffect, useMemo } from "react";
import { NewEditProfile } from "../sections/NewEditProfile";
import { useSelector } from "react-redux";


export const EditProfilePage = () => {

    const { name } = useParams();
    useSelector(  )

    const currentProfile = profiles.find((profile) => paramCase(profile.name) === name);

  return (

    <>

     <Helmet>
        <title>  Perfiles | Crear Perfil  </title>
     </Helmet>

     <Container maxWidth={'lg'}>
     <CustomBreadcrumbs
         heading="Editar Perfil"
         links={[
           { name: 'Dashboard', href: '' },
           { name: 'Perfiles', href: '' },
           { name: 'Crear Perfil' },
         ]}
       />
          
      < NewEditProfile isEdit currentProfile={currentProfile}/>

     </Container>
  </>

  )
}


