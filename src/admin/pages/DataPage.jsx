// Page Title
import { Helmet } from 'react-helmet-async'

// Status handle
import{ useEffect, useState } from 'react'

// @MUI
import {  
  Box,
  Container
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs'
import { dataRoles } from '../../_mock/dataRoles'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { DataTableBodyLayout } from '../sections/DataTableBodyLayout'


const TABLE_HEAD_ROLES = [
  { id: 'roles' , label: 'Roles' , align: 'center'}
]
const TABLE_HEAD_KNOWLEDGES = [
  { id: 'knowledges' , label: 'Conocimientos' , align: 'center'}
]
const TABLE_HEAD_TECHNOLOGIES = [
  { id: 'tecnhnologies' , label: 'Tecnologías' , align: 'center'}
]


export const DataPage = () => {

  const navigate = useNavigate();

  const [tableDataRoles, setTableDataRoles] = useState([]);
  const [tableDataKnowledges, setTableDataKnowledges] = useState([]);
  const [tableDataTechnologies, setTableDataTechnologies] = useState([]);




  useEffect(() => {
    setTableDataRoles(dataRoles);
    setTableDataKnowledges(dataKnowledges);
    setTableDataTechnologies(dataTechnologies);
  }, [dataRoles , dataKnowledges, dataTechnologies])
  

  return (
    <>
      <Helmet>
        <title> Administración | Creación Datos </title>
      </Helmet>

      <Container maxWidth={'lg'}>
      <CustomBreadcrumbs
          heading="Crear Datos"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Administración', href: '' },
            { name: 'Crear Datos' },
          ]}
        />
        <Box spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <DataTableBodyLayout tableData={tableDataRoles} setTableData={setTableDataRoles} TABLE_HEAD={TABLE_HEAD_ROLES}/>       
          <DataTableBodyLayout tableData={tableDataKnowledges} setTableData={setTableDataKnowledges} TABLE_HEAD={TABLE_HEAD_KNOWLEDGES}/> 
          <DataTableBodyLayout tableData={tableDataTechnologies} setTableData={setTableDataTechnologies} TABLE_HEAD={TABLE_HEAD_TECHNOLOGIES}/> 
          
        </Box>

      </Container>
    </>
  )
}
