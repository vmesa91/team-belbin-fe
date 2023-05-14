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
import { Label } from '../../common/components/Label';
import { Iconify } from '../../common/components/Iconify/Iconify'

// sections
import { TableListHead } from '../../common/sections/table/TableListHead';
import {  TableListToolbar } from '../../common/sections/table/TableListToolbar';

// Config
import { dataTableTeams , dataTableConfigTeam } from '../config/configTableTeams'

// Mock
import { profiles } from '../../_mock/dataProfiles'
import { dataKnowledges } from '../../_mock/dataKnowledges'
import { dataTechnologies } from '../../_mock/dataTechnologies'
import { members } from '../../_mock/dataMembers'

import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// UTILS Methods
import { getComparator } from '../../common/utils/comparatorMethods'
import { applySortFilter } from '../../common/utils/filterMethods'
import {  applyFilter } from '../utils/applyFilter'
import { useTable } from '../../hooks/useTable';
import { TeamTableToolbar } from '../sections/table/TeamTableToolbar';
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { ConfigTeamTableRow } from '../sections/table/ConfigTeamTableRow';
import { LoadingButton } from '@mui/lab';
import { ConfigTeamTableToolbar } from '../sections/table/ConfigTeamTableToolbar';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';

// ----------------------------------------------------------------------


export function ConfigTeamPage() {

  const navigate = useNavigate();

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

  const [tableData, setTableData] = useState(members)
  
  const [openConfirm, setOpenConfirm] = useState(false);
 
  const [filterName, setFilterName] = useState('');
  const [filterSympathy, setFilterSympathy] = useState(':D')
  const [filterProfile, setFilterProfile] = useState('')
  const [filterKnowledge, setFilterKnowledge] = useState('')
  const [filterTechnology, setFilterTechnology] = useState('')


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterSympathy,
    filterProfile,
    filterKnowledge,
    filterTechnology
  })

  const getLengthBySympathy = (status) => {
   
      /* tableData.filter((item) => {
      item.status === status}) */
    }

  const TABS = [
    { value: ':D', label: 'Super Happy', color: 'success', count: getLengthBySympathy(':D') },
    { value: ':)', label: 'Happy', color: 'warning', count: getLengthBySympathy(':)') },
    { value: ':|', label: 'Not working', color: 'default', count: getLengthBySympathy(':|') },
    { value: ':/', label: 'Regular', color: 'info', count: getLengthBySympathy(':|') },
    { value: ':(', label: 'Bad', color: 'error', count: getLengthBySympathy(':(') },
  ]

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isFiltered =
  filterSympathy !== ':D' ||
  filterName !== '' ||
  filterProfile !== '' ||
  filterKnowledge !== '' ||
  filterTechnology !== '' 

  const isNotFound =
  (!dataFiltered.length && !!filterName) ||
  (!dataFiltered.length && !!filterSympathy) ||
  (!dataFiltered.length && !!filterProfile) ||
  (!dataFiltered.length && !!filterKnowledge) ||
  (!dataFiltered.length && !!filterTechnology) 


  // Methods
  const handleOpen = () => {
    setOpenConfirm(true);
  }

  const handleClose = () => {
    setOpenConfirm(false);
  }

  const handleFilterBySympathy = (event, newValue) => {
    setPage(0);
    setFilterSympathy(newValue);
  }

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  }

  const handleFilterByProfile = (event) => {
    setPage(0);
    setFilterProfile(event.target.value);
  }

  const handleFilterByKnowledge = (event) => {
    setPage(0);
    setFilterKnowledge(event.target.value);
  }

  const handleFilterByTechnology = (event) => {
    setPage(0);
    setFilterTechnology(event.target.value);
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
    setFilterKnowledge('');
    setFilterTechnology('')
  }

  const handleClickItem = (path) => {
    navigate(path);
  }; 

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
          />

         <Card>
          <Tabs
          value={filterSympathy}
          onChange={handleFilterBySympathy}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
          >
          {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Divider />

          {/* <TableListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          < ConfigTeamTableToolbar 
            isFiltered={isFiltered}
            filterName={filterName}
            filterSympathy={filterSympathy}
            filterProfile={filterProfile}
            filterKnowledge={filterKnowledge}
            filterTechnology={filterTechnology}
            onFilterByName={handleFilterByName}
            onFilterBySympathy={handleFilterBySympathy}
            onFilterByProfile={handleFilterByProfile}
            onFilterByKnowledge={handleFilterByKnowledge}
            onFilterByTechnology={handleFilterByTechnology}
            onResetFilter={handleResetFilter}
            optionsSympathies={members} 
            optionsProfiles={profiles}
            optionsKnowledges={dataKnowledges}
            optionsTechnologies={dataTechnologies}
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
                    headLabel={dataTableConfigTeam}
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
                          <ConfigTeamTableRow 
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

        <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
          <LoadingButton type="submit" variant="contained">
              {'Cancelar'}
          </LoadingButton>
          <LoadingButton onClick={ () => handleClickItem( "/team/summaryTeam" ) } type="submit" variant="outlined">
              {'Siguiente'}
          </LoadingButton>
      </Stack>
</Container>
    </>
  );
}
