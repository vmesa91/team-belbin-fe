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
  Alert,
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
import { dataRolesBelbin } from '../../members/config/configTableMembers';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useTheme } from '@mui/material/styles';

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

  const theme = useTheme();


  const { configureTeam } = useSelector( state => state.teamStore )
  const { members } = useSelector( state => state.memberStore )
  const [validateMembers, setvalidateMembers] = useState(true)
  const { knowledges, tools , roles, leader } = configureTeam

  const [tableData, setTableData] = useState(members)
  
  const [openConfirm, setOpenConfirm] = useState(false);
 
  const [filterRol, setFilterRol] = useState([]);
  const [filterSympathy, setFilterSympathy] = useState('Todos')

 const [membersFiltered, setmembersFiltered] = useState()


  const dataFiltered = applyFilter({
    inputData: tableData,
    filterRol,
    optionsRolBelbin:dataRolesBelbin,
    filterSympathy,
    leader,
    filterRoles: roles,
    filterKnowledges: knowledges,
    filterTools: tools
  })

  useEffect(() => {
    setmembersFiltered(dataFiltered)
  }, [])

  const getLengthBySympathy = (value) => {

    const { colleagues } = leader
    const listFive = colleagues.filter( (coll) =>  coll.score === 5)
    const listFour = colleagues.filter( (coll) =>  coll.score === 4)
    const listThree = colleagues.filter( (coll) =>  coll.score === 3)
    const listTwo = colleagues.filter( (coll) =>  coll.score === 2)
    const listOne = colleagues.filter( (coll) =>  coll.score === 1)

    const sumBySympathy = membersFiltered?.filter((item) => {
  
      switch (value) {
        case 5:
          return listFive.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
        case 4:
          return listFour.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
        case 3:
          return listThree.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
        case 2:
          return listTwo.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
        case 1:
          return listOne.find( ( listuser ) => listuser.user._id === item.user._id ) ? true : false
        default:
           return 5
          break;
      }
    })


    return sumBySympathy?.length
  
  }

  const TABS = [
    { value: 'Todos', label: 'Todos', color: 'primary', count: membersFiltered?.length},
    { value: '5', label: 'Super Happy', color: 'success', count: getLengthBySympathy(5) , icon: <SentimentVerySatisfiedIcon color="success" /> },
    { value: '4', label: 'Happy', color: 'warning', count: getLengthBySympathy(4) , icon: <SentimentSatisfiedAltIcon color="warning" />},
    { value: '3', label: 'Not working', color: 'default', count: getLengthBySympathy(3) , icon: <SentimentSatisfiedIcon color="default" />},
    { value: '2', label: 'Regular', color: 'info', count: getLengthBySympathy(2) , icon: <SentimentDissatisfiedIcon color="info" />},
    { value: '1', label: 'Bad', color: 'error', count: getLengthBySympathy(1) , icon: <SentimentVeryDissatisfiedIcon color="error" /> },
  ]

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)



  // Methods
  const handleOpen = () => {
    setOpenConfirm(true);
  }

  const handleClose = () => {
    setOpenConfirm(false);
  }

  const handleCloseAlert = () => {
    setvalidateMembers(false)
  }
  const handleFilterBySympathy = (event, newValue) => {
    setPage(0);
    setFilterSympathy(newValue);
  }

  const handleResetFilter = () => {
    setFilterRol('');
  }

  const handleFilterRolBelbin = ({target}) => {
    setPage(0);
    (target.innerText === undefined ) ? handleResetFilter() : setFilterRol([ ...filterRol , target.innerText ])
  }


  const handleClickItem = () => 
  {
      if ((selected.length) >= 4) {
       dispatch(addMembersConfigureTeam( selected ))
       navigate( "/team/summaryTeam")
      } else {
        setvalidateMembers(true)
      }
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
         {validateMembers && (
          <Alert severity="info" onClose={handleCloseAlert}>El equipo debe tener 4 miembros mínimo</Alert> 
         )}
 
          <Tabs
          value={filterSympathy}
          onChange={handleFilterBySympathy}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
          >
          {TABS.map((tab) =>  <Tab
                key={tab.value}
                value={tab.value}
                label={tab.icon}
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
              )}
          </Tabs>

          <Divider />

          < ConfigTeamTableToolbar 
            filterRol={filterRol}
            onFilterRolesBelbin={handleFilterRolBelbin}
            optionsRoles={roles}
            optionsKnowledges={knowledges}
            optionsTools={tools}
            optionsRolBelbin={dataRolesBelbin}
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
                          />
                       ))
                    }
                  </TableBody>

                </Table>

            </TableContainer> 

            
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>

        <Stack spacing={3} sx={{ mt: 3 , display:"flex", flexDirection:'row', justifyContent:'center', gap:'20px'}}>
          <LoadingButton onClick={ handleClickItem } type="submit" variant="outlined">
              {'Siguiente'}
          </LoadingButton>
      </Stack>
</Container>
    </>
  );
}
