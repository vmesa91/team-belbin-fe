import { Helmet } from 'react-helmet-async';

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
import { Iconify } from '../../common/components/Iconify/Iconify'

// sections
import { TableListHead } from '../../common/sections/table/TableListHead';
import {  TableListToolbar } from '../../common/sections/table/TableListToolbar';

// Config
import { dataTableProfiles } from '../config/configTableProfiles'

// Breadcrumbs
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// UTILS Methods
import { getComparator } from '../../common/utils/comparatorMethods'
import { applyFilter } from '../utils/applyFilter'
import { useTable } from '../../hooks/useTable';
import { ProfileTableToolbar } from '../sections/table/ProfileTableToolbar';
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { ProfileTableRow } from '../sections/table/ProfileTableRow';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile , deleteProfiles } from '../../redux/store/profiles/profileThunk';

// ------------------------------------------------------------------


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

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { activeProfile , profiles } = useSelector( state => state.profileStore )

  const { tools , roles, errorMessage } = useSelector( state => state.dataStore )

  const [tableData, setTableData] = useState(profiles)
  
  const [openConfirm, setOpenConfirm] = useState(false)
 
  const [filterName, setFilterName] = useState('')

  const [filterRol, setFilterRol] = useState('')

  const [filterTechnology, setFilterTechnology] = useState('')

  const [filterMember, setFilterMember] = useState('')

  useEffect(() => {
    setTableData(profiles)
  }, [profiles]) 

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRol,
    filterTechnology,
    filterMember
  })

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isFiltered =
  filterName !== '' ||
  filterRol !== '' ||
  filterTechnology !== '' ||
  filterMember !== '' 

  const isNotFound =
  (!dataFiltered.length && !!filterName) ||
  (!dataFiltered.length && !!filterRol) ||
  (!dataFiltered.length && !!filterTechnology) || 
  (!dataFiltered.length && !!filterMember) 


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

  const handleFilterByMember = (event) => {
    setPage(0);
    setFilterMember(event.target.value);
  }

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    dispatch( deleteProfile( id ) )
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
    dispatch( deleteProfiles( selectedRows ) )
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
    setFilterMember('')
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


          < ProfileTableToolbar 
            isFiltered={isFiltered}
            filterName={filterName}
            filterRol={filterRol}
            filterTechnology={filterTechnology}
            filterMember={filterMember}
            onFilterByName={handleFilterByName}
            onFilterByRol={handleFilterByRol}
            onFilterByMember={handleFilterByMember}
            onFilterByTechnology={handleFilterByTechnology}
            onResetFilter={handleResetFilter}
            optionsRoles={roles} 
            optionsTechnologies={tools}
            optionsMembers={tools}
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
