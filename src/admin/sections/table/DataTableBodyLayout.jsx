

import { Button, Card, IconButton, Table, TableBody, TableContainer, Tooltip } from '@mui/material'
import { DataTableToolbar } from './DataTableToolbar'
import { DataTableRow, TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedAction, TableSkeleton } from '../../components/Table'
import { Iconify } from '../../../common/components/Iconify/Iconify'
import { useState } from 'react'
import { useTable } from '../../hooks/useTable'
import { getComparator } from '../../utils/utils'
import { TablePaginationCustom } from '../../components/Table/TablePaginationCustom'
import { ConfirmDialog } from '../../../common/components/ConfirmDialog/ConfirmDialog'
import { useDispatch } from 'react-redux'
import { deleteData, deleteDatas } from '../../../redux/store/data/dataThunk'


export const DataTableBodyLayout = ({ tableData , setTableData , TABLE_HEAD , typeData }) => {

    const dispatch = useDispatch()
 

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
        onChangeRowsPerPage,
      } = useTable();


  const [filterName, setFilterName] = useState('');
  const isFiltered = filterName !== '';

  const [openConfirm, setOpenConfirm] = useState(false);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName
  });
  
  const isNotFound = (!dataFiltered.length && !!filterName) 

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteRow = (id) => {

    const deleteRow = tableData.filter((row) => row._id !== id);
    setSelected([]);
    dispatch( deleteData( id , typeData ) )
    setTableData(deleteRow)

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    
    const deleteRows = tableData.filter((row) => selectedRows.includes(row._id));
    setSelected([]);
    dispatch( deleteDatas( deleteRows , typeData ) )
    setTableData(deleteRows)
    

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
  };

  const handleResetFilter = () => {
    setFilterName('');
  };


    
  return (

    <>
        <Card sx={{ minHeight: '615px' }}>
            <DataTableToolbar 
            filterName={filterName}
            onFilterName={handleFilterName}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
            
            />

            <TableContainer >
                <TableSelectedAction 
                    spacing={1}
                    alignItems="center"
                    direction={{
                    xs: 'column',
                    md: 'row',
                    }}
                    sx={{ px: 2.5, py: 2 }} 
                    numSelected={selected.length}
                    rowCount={tableData.length}
                    onSelectAllRows={(checked) =>
                    onSelectAllRows(
                        checked,
                        tableData.map((row) => row._id)
                    )
                    }
                    action={
                    <Tooltip title="Eliminar">
                        <IconButton color="primary" onClick={handleOpenConfirm}>
                        <Iconify icon="eva:trash-2-outline" />
                        </IconButton>
                    </Tooltip>
                    }
                />
                <Table sx={{ minWidth: 350 }} >
                    <TableHeadCustom sx={{ backgroundColor: 'red' }}
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={tableData.length}
                        numSelected={selected.length}
                        onSort={onSort}
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
                            .map((row, index) => (
                            row ? (
                                <DataTableRow 
                                    key={row._id}
                                    row={row}
                                    selected={selected.includes(row._id)}
                                    onSelectRow={() => onSelectRow(row._id)}
                                    onDeleteRow={() => handleDeleteRow(row._id)}
                                />
                            ) : (
                                !isNotFound && <TableSkeleton key={index} sx={{ height: 60 }} />
                            )
                            ))
                        }

                        <TableEmptyRows />

                        <TableNoData isNotFound={isNotFound} />  
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePaginationCustom count={dataFiltered.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}/>
        </Card>

        <ConfirmDialog 
            open={openConfirm}
            onClose={handleCloseConfirm}
            title="Eliminar"
            content={
            <>
                ¿Estás seguro que desea eliminar <strong> {selected.length} </strong> elementos?
            </>
            }
            action={
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleDeleteRows(selected);
                    handleCloseConfirm();
                  }}
                >
                  Eliminar
                </Button>
              } 
        />
    
    </>    
  )
}


function applyFilter({ inputData, comparator, filterName }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  
    inputData = stabilizedThis.map((el) => el[0]);
  
    if (filterName) {
      inputData = inputData.filter(
        (data) => data.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  
    return inputData;
  }
