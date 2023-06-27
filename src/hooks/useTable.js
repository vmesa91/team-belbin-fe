import { useState, useCallback } from 'react';

export const useTable = (props) => {


 /*  // State to manage how we want order the table
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name')


  // State to manage the way to order the table
  const [order, setOrder] = useState(props?.defaultOrder || 'asc') */

  // State to manage the pagination 
  const [page, setPage] = useState(props?.defaultCurrentPage || 0)

  // State to manage number of row per page
  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5)

  // State to manage the selected row
  const [selected, setSelected] = useState(props?.defaultSelected || [])

/*   // Function to manage the order
  const onSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  ) */

  // Function to manage the selected row
  const onSelectRow = useCallback(
    (id) => {
      const selectedIndex = selected.indexOf(id);

      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  )

  // Function to manage all selected rows
  const onSelectAllRows = useCallback((checked, newSelecteds) => {

   
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []
  )

  // Manage to change page
  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []
  )

  // Manage to change row per page
  const onChangeRowsPerPage = useCallback((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []
  )

  return {
    page,
    rowsPerPage,

    selected,
    onSelectRow,
    onSelectAllRows,

    onChangePage,
    onChangeRowsPerPage,

    setPage,
    setSelected,
    setRowsPerPage
  }
}
