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

// Languages
import { dataCountries } from '../../_mock/dataCountries'

// Config
import { dataTableMembers } from '../config/configTableMembers'

// Breadcrumbs
import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// Paths
import { PATH_MEMBER } from '../../home/routes/paths'

// UTILS Methods
import { applyFilter } from '../utils/applyFilter'
import { useTable } from '../../hooks/useTable';
import { MemberTableToolbar } from '../sections/table/MemberTableToolbar'
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { MemberTableRow } from '../sections/table/MemberTableRow';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { TableNoData } from '../../common/sections/table/TableNoData';
import { TableEmptyRows } from '../../common/sections/table/TableEmptyRows';
import { emptyRows } from '../../common/utils/emptyRows';
import { deleteMember, deleteMembers } from '../../redux/store/members/memberThunk';

// ----------------------------------------------------------------------

export function TableMembersPage() {

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

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {  members } = useSelector( state => state.memberStore )

  const { teams } = useSelector( state => state.teamStore )

  const { profiles } = useSelector( state => state.profileStore )

  const [tableData, setTableData] = useState(members)
  
  const [openConfirm, setOpenConfirm] = useState(false)

  const [filterName, setFilterName] = useState('')

  const [filterProfile, setFilterProfile] = useState([])

  const [filterTeam, setFilterTeam] = useState([])
  
  const [filterLanguage, setFilterLanguage] = useState([])


  useEffect(() => {
    setTableData(members)
  }, [members]) 

  const dataFiltered = applyFilter({
    inputData: tableData,
    filterName,
    filterProfile,
    filterTeam,
    filterLanguage
  })

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isFiltered =
  filterName !== '' ||
  filterProfile.length > 0 ||
  filterLanguage.length > 0 ||
  filterTeam.length > 0 

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

  const handleFilterByProfile = ({ target }) => {
    setPage(0);
    (target.innerText === undefined ) ? handleResetFilter() : setFilterProfile([ ...filterProfile , target.innerText ])
  }

  const handleFilterByTeam = ({ target }) => {
    setPage(0);
    (target.innerText === undefined ) ? handleResetFilter() : setFilterTeam([ ...filterTeam , target.innerText ])
  }

  const handleFilterByLanguage = ({ target }) => {
    setPage(0);
    (target.innerText === undefined ) ? handleResetFilter() : setFilterLanguage([ ...filterLanguage , target.innerText ])
  }

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row._id !== id);
    setSelected([]);
    dispatch( deleteMember( id ) )
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
    dispatch( deleteMembers( selectedRows ) )
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
    navigate(PATH_MEMBER.editMember(id));
  }


  const handleResetFilter = () => {
    setFilterName('');
    setFilterProfile([]);
    setFilterTeam([]);
    setFilterLanguage([]);
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

          < MemberTableToolbar 
            isFiltered={isFiltered}
            filterName={filterName}
            filterProfile={filterProfile}
            filterTeam={filterTeam}
            filterLanguage={filterLanguage}
            onFilterByName={handleFilterByName}
            onFilterByProfile={handleFilterByProfile}
            onFilterByTeam={handleFilterByTeam}
            onFilterByLanguage={handleFilterByLanguage}
            onResetFilter={handleResetFilter}
            optionsProfiles={profiles}
            optionsTeams={teams}
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
                    headLabel={dataTableMembers}
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
                          <MemberTableRow 
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
                    <TableEmptyRows
                      emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                    />

                    <TableNoData isNotFound={isNotFound} />
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
