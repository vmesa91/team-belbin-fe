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
import { useParams } from "react-router-dom";
import { paramCase } from "change-case";
import { mappingMember } from "../utils/mappingMember";




export const EditMemberPage = () => {

  const { id } = useParams();
  const { members } = useSelector( state => state.memberStore )

  let currentMember = members.find((member) => paramCase(member._id) === id);
  currentMember = mappingMember(currentMember)


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