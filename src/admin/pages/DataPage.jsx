// Page Title
import { Helmet } from 'react-helmet-async'

// Status handle
import{ useEffect, useMemo, useState } from 'react'

// @MUI
import {  
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle
} from '@mui/material'

import { Link as RouterLink } from 'react-router-dom';
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs'
import { DataTableBodyLayout } from '../sections/table/DataTableBodyLayout'
import { Iconify } from '../../common/components/Iconify/Iconify';
import { NewDataModalForm } from '../sections/dialog/NewDataModalForm';
import { useSelector } from 'react-redux';
import Loading from '../../common/animations/Loading';


const TABLE_HEAD_ROLES = [
  { _id: 'roles' , label: 'Roles' , align: 'center'}
]
const TABLE_HEAD_KNOWLEDGES = [
  { _id: 'knowledges' , label: 'Conocimientos' , align: 'center'}
]
const TABLE_HEAD_TECHNOLOGIES = [
  { _id: 'tecnhnologies' , label: 'Tecnologías' , align: 'center'}
]

export const DataPage = () => {

  const { tools , roles, knowledges , errorMessage, isLoading } = useSelector( state => state.dataStore )

  const [hasError, setHasError] = useState(false)
  const [tableDataRoles, setTableDataRoles] = useState([]);
  const [tableDataKnowledges, setTableDataKnowledges] = useState([]);
  const [tableDataTools, setTableDataTools] = useState([]);

  const [openFormNewData, setOpenFormNewData] = useState(false);

  const handleOpenModalNewData = () => {
    setOpenFormNewData(true)
  }
  
  const handleCloseModalNewData = () => {
    setOpenFormNewData(false)
  }
  
  useEffect(() => {
    setTableDataRoles(roles)
    setTableDataKnowledges(knowledges)
    setTableDataTools(tools)
  }, [roles , knowledges, tools])  
  
  
  useEffect(() => {
    if (errorMessage !== undefined) {
      setHasError(true)
      
    }
  }, [errorMessage])

  return (
    <>
      <Helmet>
        <title> Administración | Creación Datos </title>
      </Helmet>

      { isLoading ? < Loading /> : <Container maxWidth={'lg'}>
      <CustomBreadcrumbs
          heading="Crear Datos"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Administración', href: '' },
            { name: 'Crear Datos' },
          ]}
          action={
            <Button
              component={RouterLink}
              onClick={handleOpenModalNewData}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nuevo Dato
            </Button>
          }
        />
        {!!hasError && <Alert severity="error" sx={{ width: '30%' , padding: '2px' }}> {errorMessage} </Alert>}
        <Box spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <DataTableBodyLayout key={'roles'} tableData={tableDataRoles} setTableData={setTableDataRoles} TABLE_HEAD={TABLE_HEAD_ROLES} typeData={'Rol'}/>       
          <DataTableBodyLayout key={'knowledges'} tableData={tableDataKnowledges} setTableData={setTableDataKnowledges} TABLE_HEAD={TABLE_HEAD_KNOWLEDGES} typeData={'Knowledge'}/> 
          <DataTableBodyLayout key={'tools'} tableData={tableDataTools} setTableData={setTableDataTools} TABLE_HEAD={TABLE_HEAD_TECHNOLOGIES} typeData={'Tool'}/> 
          
        </Box>

      </Container>}

      <Dialog fullWidth maxWidth="xs" open={openFormNewData} onClose={handleCloseModalNewData}>
        < DialogTitle > Añadir Dato </ DialogTitle >
        < NewDataModalForm onCancel={ handleCloseModalNewData } />
      </Dialog>
    </>
  )
}
