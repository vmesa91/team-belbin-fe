import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { Label } from '../../common/components/Label';
import { Iconify } from '../../common/components/Iconify/Iconify'

// sections
import { TableListHead } from '../../common/sections/table/TableListHead';
import {  TableListToolbar } from '../../common/sections/table/TableListToolbar';

// Config
import { dataTableMembers } from '../config/configTableMembers'

// Mock
import { teams } from '../../_mock/dataTeams'

// Breadcrumbs
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// Paths
import { PATH_MEMBER } from '../../home/routes/paths'

// UTILS Methods
import { getComparator } from '../../common/utils/comparatorMethods'
import { applyFilter } from '../utils/applyFilter'
import { useTable } from '../../hooks/useTable';
import { MemberTableToolbar } from '../sections/table/MemberTableToolbar'
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { MemberTableRow } from '../sections/table/MemberTableRow';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export function TableMembersPage() {

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

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { activeMember , members } = useSelector( state => state.memberStore )

  const { profiles } = useSelector( state => state.profileStore )

  const [tableData, setTableData] = useState(members)
  
  const [openConfirm, setOpenConfirm] = useState(false)

  const [filterName, setFilterName] = useState('')

  const [filterProfile, setFilterProfile] = useState('')

  const [filterTeam, setFilterTeam] = useState('')
  
  const [filterLanguage, setFilterLanguage] = useState('')


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterProfile,
    filterTeam,
    filterLanguage
  })

  useEffect(() => {
    setTableData(members)
  }, [members]) 

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isFiltered =
  filterName !== '' ||
  filterProfile !== '' ||
  filterLanguage !== '' ||
  filterTeam !== '' 

  const isNotFound =
  (!dataFiltered.length && !!filterName) ||
  (!dataFiltered.length && !!filterProfile) ||
  (!dataFiltered.length && !!filterTeam) ||
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

  const handleFilterByProfile = (event, newValue) => {
    setPage(0);
    setFilterProfile(newValue);
  }

  const handleFilterByTeam = (event) => {
    setPage(0);
    setFilterTeam(event.target.value);
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
    setFilterTeam('');
    setFilterLanguage('');
  }


  return (
    <>
        <Helmet>
          <title> Miembros | Gestionar Miembros </title>
        </Helmet>

        <Container>

          <CustomBreadcrumbs
            heading="Gestionar Miembros"
            links={[
              {
                name: 'Dashboard',
                href: '',
              },
              {
                name: 'Miembros',
                href: '',
              },
              {
                name: 'Gestionar Miembros',
              },
            ]}
            action={
              <Button
                component={RouterLink}
                to={PATH_MEMBER.createMember}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Crear Miembro
              </Button>
            }
          />

         <Card>

          {/* <TableListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          < MemberTableToolbar 
            isFiltered={isFiltered}
            filterName={filterName}
            filterProfile={filterProfile}
            filterTeam={filterTeam}
            filterLanguage={filterLanguage}
            onFilterByName={handleFilterByName}
            onFilterByProfile={handleFilterByProfile}
            onFilterByTeam={handleFilterByTeam}
            onFilterLanguage={handleFilterByLanguage}
            onResetFilter={handleResetFilter}
            optionsProfiles={profiles}
            optionsTeams={teams}
            optionsLanguages={profiles}
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
                    headLabel={dataTableMembers}
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
                          <MemberTableRow 
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
