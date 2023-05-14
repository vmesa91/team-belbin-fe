import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';

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
// Config
import { dataTableTeams , dataTableConfigTeam } from '../config/configTableTeams'

// Mock
import { profiles } from '../../_mock/dataProfiles'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { teams } from '../../_mock/dataTeams'
import { dataCountries } from '../../_mock/dataCountries'
import { members } from '../../_mock/dataMembers'

import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// UTILS Methods
import { getComparator } from '../../common/utils/comparatorMethods'
import { applySortFilter } from '../../common/utils/filterMethods'
import {  applyFilter } from '../utils/applyFilter'
import { useTable } from '../../hooks/useTable';
import { TeamTableToolbar } from '../sections/table/TeamTableToolbar';
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { TeamTableRow } from '../sections/table/TeamTableRow';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';

// ----------------------------------------------------------------------


export function TableTeamsPage() {

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

  const [tableData, setTableData] = useState(teams)

  const navigate = useNavigate()
  
  const [openConfirm, setOpenConfirm] = useState(false);
 
  const [filterName, setFilterName] = useState('');
  
  const [filterProfile, setFilterProfile] = useState('')

  const [filterMember, setFilterMember] = useState('')

  const [filterLanguage, setFilterLanguage] = useState('')


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterProfile,
    filterMember,
    filterLanguage
  })


  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isFiltered =
  filterName !== '' ||
  filterProfile !== '' ||
  filterMember !== '' ||
  filterLanguage !== '' 

  const isNotFound =
  (!dataFiltered.length && !!filterName) ||
  (!dataFiltered.length && !!filterProfile) ||
  (!dataFiltered.length && !!filterMember) ||
  (!dataFiltered.length && !!filterLanguage) 


  // Methods
  const handleOpen = () => {
    setOpenConfirm(true);
  }

  const handleClose = () => {
    setOpenConfirm(false);
  }

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  }

  const handleFilterByProfile = (event) => {
    setPage(0);
    setFilterProfile(event.target.value);
  }

  const handleFilterByMember = (event) => {
    setPage(0);
    setFilterMember(event.target.value);
  }

  const handleFilterByLanguage = (event) => {
    setPage(0);
    setFilterLanguage(event.target.value);
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
    setFilterProfile('');
    setFilterMember('');
    setFilterLanguage('')
  }

  return (
    <>
        <Helmet>
          <title> Equipos | Gestionar Equipos </title>
        </Helmet>

        <Container>

          <CustomBreadcrumbs
            heading="Gestionar Equipos"
            links={[
              {
                name: 'Dashboard',
                href: '',
              },
              {
                name: 'Equipos',
                href: '',
              },
              {
                name: 'Gestionar Equipos',
              },
            ]}
            action={
              <Button
                component={RouterLink}
                to={''}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Crear Equipo
              </Button>
            }
          />

         <Card>

          {/* <TableListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          < TeamTableToolbar 
            isFiltered={isFiltered}
            filterName={filterName}
            filterProfile={filterProfile}
            filterMember={filterMember}
            filterLanguage={filterLanguage}
            onFilterByName={handleFilterByName}
            onFilterByProfile={handleFilterByProfile}
            onFilterByMember={handleFilterByMember}
            onFilterByLanguage={handleFilterByLanguage}
            onResetFilter={handleResetFilter}
            optionsProfiles={profiles}
            optionsMembers={members}
            optionsLanguages={dataCountries}
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
                    headLabel={dataTableTeams}
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
                          <TeamTableRow 
                              key={row.id}
                              row={row}
                              selected={selected.includes(row.id)}
                              onSelectRow={() => onSelectRow(row.id)}
                              onViewRow={() => handleViewRow(row.id)}
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
            count={members.length}
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
