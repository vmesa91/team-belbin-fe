import { Helmet } from 'react-helmet-async';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
// components
import { Iconify } from '../../common/components/Iconify/Iconify'

// sections
import { TableListHead } from '../../common/sections/table/TableListHead';
// Config
import { dataTableTeams } from '../config/configTableTeams'

// Mock
import { profiles } from '../../_mock/dataProfiles'
import { dataCountries } from '../../_mock/dataCountries'

import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// UTILS Methods
import {  applyFilter } from '../utils/applyTableFilter'
import { useTable } from '../../hooks/useTable';
import { TeamTableToolbar } from '../sections/table/TeamTableToolbar';
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { TeamTableRow } from '../sections/table/TeamTableRow';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeam, deleteTeams } from '../../redux/store/teams/teamThunk';
import { PATH_TEAM } from '../../home/routes/paths';
import { updataInfo } from '../../common/utils/updateInfo';

// ----------------------------------------------------------------------


export function TableTeamsPage() {

  const {
    page,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onChangePage,
    onChangeRowsPerPage
  } = useTable()

  updataInfo()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { teams } = useSelector( state => state.teamStore )

  const { profiles } = useSelector( state => state.profileStore )

  const { members } = useSelector( state => state.memberStore )

  const [tableData, setTableData] = useState(teams)

  const [openConfirm, setOpenConfirm] = useState(false);
 
  const [filterName, setFilterName] = useState('');
  
  const [filterProfile, setFilterProfile] = useState([])

  const [filterMember, setFilterMember] = useState([])

  const [filterLanguage, setFilterLanguage] = useState([])

  useEffect(() => {
    setTableData(teams)
  }, [teams]) 


  const dataFiltered = applyFilter({
    inputData: tableData,
    filterName,
    filterProfile,
    filterMember,
    filterLanguage
  })


  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isFiltered =
  filterName !== '' ||
  filterProfile.length > 0 ||
  filterLanguage.length > 0 ||
  filterMember.length > 0 

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

  const handleFilterByProfile = ({target}) => {
    setPage(0);
    (target.innerText === undefined ) ? handleResetFilter() : setFilterProfile([ ...filterProfile , target.innerText ])
  }

  const handleFilterByMember = ({target}) => {
    setPage(0);
    (target.innerText === undefined ) ? handleResetFilter() : setFilterMember([ ...filterMember , target.innerText ])
  }

  const handleFilterByLanguage = ({target}) => {
    setPage(0);
    (target.innerText === undefined ) ? handleResetFilter() : setFilterLanguage([ ...filterLanguage , target.innerText ])
  }

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row._id !== id);
    setSelected([]);
    dispatch( deleteTeam(id) )
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  }

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row._id));
    setSelected([]);
    dispatch( deleteTeams( selectedRows ) )
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
    navigate(PATH_TEAM.editTeam(id));
  }


  const handleResetFilter = () => {
    setFilterName('');
    setFilterProfile([]);
    setFilterMember([]);
    setFilterLanguage([])
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
                to={PATH_TEAM.createTeam}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Crear Equipo
              </Button>
            }
          />

         <Card>

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
                        tableData.map((row) => row._id)
                      )
                    }
                    action={
                      <Stack direction="row">
                          <Tooltip title="Eliminar">
                            <IconButton color="primary" onClick={handleOpen}>
                              <Iconify icon="eva:trash-2-outline" />
                            </IconButton>
                          </Tooltip>
                      </Stack>
                    }
                />

                <Table sx={{ minWidth: 800 }}>
                  <TableListHead 
                    headLabel={dataTableTeams}
                    rowCount={tableData.length}
                    numSelected={selected.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row._id)
                      )
                    }
                  />

                  <TableBody>
                    {
                      dataFiltered
                       .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                       .map( (row) => (
                          <TeamTableRow 
                              key={row._id}
                              row={row}
                              selected={selected.includes(row._id)}
                              onSelectRow={() => onSelectRow(row._id)}
                              onViewRow={() => handleViewRow(row._id)}
                              onEditRow={() => handleEditRow(row._id)}
                              onDeleteRow={() => handleDeleteRow(row._id)}
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
        title="Eliminar"
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
