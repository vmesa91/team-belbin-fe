import { Helmet } from 'react-helmet-async';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tabs,
  Divider,
  Tab,
  Tooltip,
} from '@mui/material';
// components
import { Iconify } from '../../common/components/Iconify/Iconify'

// sections
import { TableListHead } from '../../common/sections/table/TableListHead';
import {  TableListToolbar } from '../../common/sections/table/TableListToolbar';

// Config
import { dataTableProfiles } from '../config/configTableProfiles'

// Mock
import { profiles } from '../../_mock/dataProfiles'
import { teams } from '../../_mock/dataTeams'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { dataRoles } from '../../_mock/dataRoles'
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// UTILS Methods
import { getComparator } from '../../common/utils/comparatorMethods'
import { applyFilter } from '../utils/applyFilter'
import { useTable } from '../../hooks/useTable';
import { ProfileTableToolbar } from '../sections/table/ProfileTableToolbar';
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { ProfileTableRow } from '../sections/table/ProfileTableRow';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';

// ----------------------------------------------------------------------


export function TableProfilesPage() {

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage
  } = useTable()

  const navigate = useNavigate()

  const [tableData, setTableData] = useState(profiles)
  
  const [openConfirm, setOpenConfirm] = useState(false)
 
  const [filterName, setFilterName] = useState('')

  const [filterRol, setFilterRol] = useState('')

  const [filterTechnology, setFilterTechnology] = useState('')

  const [filterTeam, setFilterTeam] = useState('')

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRol,
    filterTechnology,
    filterTeam
  })

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isFiltered =
  filterName !== '' ||
  filterRol !== '' ||
  filterTechnology !== '' ||
  filterTeam !== '' 

  const isNotFound =
  (!dataFiltered.length && !!filterName) ||
  (!dataFiltered.length && !!filterRol) ||
  (!dataFiltered.length && !!filterTechnology) || 
  (!dataFiltered.length && !!filterTeam) 


  // Methods
  const handleOpen = () => {
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };
  
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  }

  const handleFilterByRol = (event) => {
    setPage(0);
    setFilterRol(event.target.value);
  }

  const handleFilterByTechnology = (event) => {
    setPage(0);
    setFilterTechnology(event.target.value);
  }

  const handleFilterByTeam = (event) => {
    setPage(0);
    setFilterTeam(event.target.value);
  }

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  }

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  }

  const handleEditRow = (id) => {
    // navigate(PATH_DASHBOARD.invoice.edit(id));
  }


  const handleResetFilter = () => {
    setFilterName('');
    setFilterRol()
    setFilterTechnology('');
    setFilterTeam('')
  }

  return (
    <>
        <Helmet>
          <title> Perfiles | Gestionar Perfiles </title>
        </Helmet>

        <Container>

          <CustomBreadcrumbs
            heading="Gestionar Perfiles"
            links={[
              {
                name: 'Dashboard',
                href: '',
              },
              {
                name: 'Perfiles',
                href: '',
              },
              {
                name: 'Gestionar Perfiles',
              },
            ]}
            action={
              <Button
                component={RouterLink}
                to={''}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Crear Perfil
              </Button>
            }
          />

         <Card>

          {/* <TableListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          < ProfileTableToolbar 
            isFiltered={isFiltered}
            filterName={filterName}
            filterRol={filterRol}
            filterTechnology={filterTechnology}
            filterTeam={filterTeam}
            onFilterByName={handleFilterByName}
            onFilterByRol={handleFilterByRol}
            onFilterByTeam={handleFilterByTeam}
            onFilterByTechnology={handleFilterByTechnology}
            onResetFilter={handleResetFilter}
            optionsRoles={dataRoles} 
            optionsTechnologies={dataTechnologies}
            optionsTeams={teams}
            />

            <TableContainer sx={{ minWidth: 800 }}>
                <TableSelectedAction 
                    numSelected={selected.length}
                    rowCount={tableData.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.id)
                      )
                    }
                    action={
                      <Stack direction="row">
                          <Tooltip title="Delete">
                            <IconButton color="primary" onClick={handleOpen}>
                              <Iconify icon="eva:trash-2-outline" />
                            </IconButton>
                          </Tooltip>
                      </Stack>
                    }
                />

                <Table sx={{ minWidth: 800 }}>
                 <TableListHead 
                    order={order}
                    orderBy={orderBy}
                    headLabel={dataTableProfiles}
                    rowCount={tableData.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.id)
                      )
                    }
                  /> 

                  <TableBody>
                    {
                      dataFiltered
                       .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                       .map( (row) => (
                          <ProfileTableRow 
                              key={row.id}
                              row={row}
                              selected={selected.includes(row.id)}
                              onSelectRow={() => onSelectRow(row.id)}
                              onEditRow={() => handleEditRow(row.id)}
                              onDeleteRow={() => handleDeleteRow(row.id)}
                          />
                       ))
                    }
                  </TableBody>
                </Table>

            </TableContainer> 

            
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={profiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
    </Container>
    
    <ConfirmDialog 
        open={openConfirm}
        onClose={handleClose}
        title="Delete"
        content={
          <>
            ¿Esta seguro que desea eliminar <strong> {selected.length} </strong> elementos?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleClose();
            }}
          >
            Eliminar
          </Button>
        }
      />
    
    </>
  );
}
