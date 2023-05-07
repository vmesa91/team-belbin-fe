import { useCallback, useState } from "react";

export const useTable = (props) => {
  
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');

  const [order, setOrder] = useState(props?.defaultOrder || 'asc');

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 6);

  const [selected, setSelected] = useState(props?.defaultSelected || []);

  // Ordenar lista
  const onSort = useCallback((id) => {
      const isAsc = orderBy === id && order === 'asc'
      if ( id !== '' ) {
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(id)
      }
  },
  [ order, orderBy ])
  
  // Gestionar botón de seleccionar cada fila
  const onSelectRow = useCallback((id) => {
    const selectedIndex = selected.indexOf(id)

    let newSelected = []

    if ( selectedIndex === -1 ) {
      newSelected = newSelected.concat(selected , id)  
    } else if ( selectedIndex === 0 ){
      newSelected = newSelected.concat(selected.slice(1))
    } else if ( selectedIndex === selected.lenght -1 ){
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0){
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  },
  [selected]
  )

  // Gestionar botón de seleccionar todas las filas
  const onSelectAllRows = useCallback(( checked, newSelecteds ) => {

    if (checked) {
      setSelected( newSelecteds)
      return;
    }
    setSelected([])
  }, [])

  // Gestionar botón cambio de página
  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  // Gestionar botón de elementos por página
  const onChangeRowsPerPage = useCallback((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  return { 
    
    order,
    page,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    //
    setPage,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage
  
  }
}
