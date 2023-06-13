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

// Config
import { dataTableTeams , dataTableConfigTeam } from '../config/configTableTeams'

import { CustomBreadcrumbs } from '../../common/components/Breadcrumbs/CustomBreadcrumbs';

// UTILS Methods
import { getComparator } from '../../common/utils/comparatorMethods'
import { applySortFilter } from '../../common/utils/filterMethods'
import {  applyFilter } from '../utils/applyConfigFilter'
import { useTable } from '../../hooks/useTable';
import { TeamTableToolbar } from '../sections/table/TeamTableToolbar';
import { TableSelectedAction } from '../../common/sections/table/TableSelectedAction';
import { ConfigTeamTableRow } from '../sections/table/ConfigTeamTableRow';
import { LoadingButton } from '@mui/lab';
import { ConfigTeamTableToolbar } from '../sections/table/ConfigTeamTableToolbar';
import { ConfirmDialog } from '../../common/components/ConfirmDialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { addMembersConfigureTeam } from '../../redux/store/teams/teamThunk';

// ----------------------------------------------------------------------


export function ConfigTeamPage() {

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

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { configureTeam } = useSelector( state => state.teamStore )
  const { members } = useSelector( state => state.memberStore )
  const { knowledges, tools , roles, leader } = configureTeam
  const dataLeader = members.filter(  (member) => member._id === leader )

  const [tableData, setTableData] = useState(members)
  
  const [openConfirm, setOpenConfirm] = useState(false);
 
  const [filterName, setFilterName] = useState('');
  const [filterSympathy, setFilterSympathy] = useState(':D')



  const dataFiltered = applyFilter({
    inputData: tableData,
    filterName,
    filterSympathy,
    filterRoles: roles,
    filterKnowledges: knowledges,
    filterTools: tools
  })


  const getLengthBySympathy = (value) => {
      
    const { colleagues } = dataLeader
   
    console.log("🚀 ~ file: ConfigTeamPage.jsx:104 ~ getLengthBySympathy ~ colleagues:", colleagues)
  
    //const filterColleagues = colleagues.filter( ( colleague ) => colleague.score === value )
    
    //console.log(filterColleagues)
    dataFiltered.filter((item) => {
      console.log(item.colleagues)
    
    })

  }

  const TABS = [
    { value: 'Todos', label: 'Todos', color: 'primary', count: dataFiltered.length },
    { value: 5, label: 'Super Happy', color: 'success', count: getLengthBySympathy(5) },
    { value: 4, label: 'Happy', color: 'warning', count: getLengthBySympathy(4) },
    { value: 3, label: 'Not working', color: 'default', count: getLengthBySympathy(3) },
    { value: 2, label: 'Regular', color: 'info', count: getLengthBySympathy(2) },
    { value: 1, label: 'Bad', color: 'error', count: getLengthBySympathy(1) },
  ]

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isNotFound =
  (!dataFiltered.length && !!filterName) ||
  (!dataFiltered.length && !!filterSympathy) ||
  (!dataFiltered.length && !!roles) ||
  (!dataFiltered.length && !!knowledges) ||
  (!dataFiltered.length && !!tools) 


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


  const handleClickItem = () => 
    {
      navigate( "/team/summaryTeam")
      dispatch(addMembersConfigureTeam( selected ))

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

          < ConfigTeamTableToolbar 
            filterName={filterName}
            onFilterByName={handleFilterByName}
            optionsRoles={roles}
            optionsKnowledges={knowledges}
            optionsTools={tools}
            />

            <TableContainer sx={{ minWidth: 800 }}>
                <TableSelectedAction 
                    numSelected={selected.length}
                    rowCount={tableData.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row)
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
                    headLabel={dataTableConfigTeam}
                    rowCount={tableData.length}
                    numSelected={selected.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row)
                      )
                    }
                  />

                  <TableBody>
                    {
                      dataFiltered
                       .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                       .map( (row) => (
                          <ConfigTeamTableRow 
                              key={row._id}
                              row={row}
                              selected={selected.includes(row)}
                              onSelectRow={() => onSelectRow(row)}
/*                               onViewRow={() => handleViewRow(row._id)}
                              onEditRow={() => handleEditRow(row._id)}
                              onDeleteRow={() => handleDeleteRow(row._id)} */
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
          <LoadingButton onClick={ handleClickItem } type="submit" variant="outlined">
              {'Siguiente'}
          </LoadingButton>
      </Stack>
</Container>
    </>
  );
}
