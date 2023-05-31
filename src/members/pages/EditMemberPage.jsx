// PRODUCT NEW EDIT FORM

// @mui
import { Card, Container, Divider, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"

// Config
import { dataRolesBelbin } from '../config/configTableMembers'
import { Helmet } from "react-helmet-async";
import { CustomBreadcrumbs } from "../../common/components/Breadcrumbs/CustomBreadcrumbs";
import { members } from '../../_mock/dataMembers'
import { dataRoles } from '../../_mock/dataRoles'
import { dataCountries } from '../../_mock/dataCountries'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { FormProvider } from "../../common/components/Form/FormProvider";
import { useForm } from "react-hook-form";
import { CustomAutocomplete } from "../../common/components/Form/CustomAutocomplete";
import { LoadingButton } from "@mui/lab";
import { ScoreTools } from "../sections/score/ScoreTools";
import { CustomSelect } from "../../common/components/Form/CustomSelect";
import { ScoreColleagues } from "../sections/score/ScoreColleagues";
import { useSelector } from "react-redux";
import { NewEditMember } from "../sections/NewEditMember";




export const EditMemberPage = () => {

  const { name } = useParams();

  const currentMember = profiles.find((profile) => paramCase(profile.name) === name);
  
  return (
    <>
      <Helmet>
          <title>  Miembros | Crear Miembros  </title>
      </Helmet>

      <Container maxWidth={'lg'}>
        {/* Añadir todas las páginas : Breadcrumbs */}
      <CustomBreadcrumbs
          heading="Crear Miembro"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Miembros', href: '' },
            { name: 'Crear Miembro' },
          ]}
        />

        < NewEditMember isEdit currentMember={currentMember}/>
      </Container>
    </>
)
}