// Aplicar filtro
export function applyFilter({
    inputData,
    comparator,
    filterName,
    filterSympathy,
    filterProfile,
    filterTeam,
  }) {
/*     const stabilizedThis = inputData.map((el, index) => [el, index]);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  
    inputData = stabilizedThis.map((el) => el[0]);
  
    if (filterName) {
      inputData = inputData.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          invoice.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  
    if (filterSympathy !== 'all') {
      inputData = inputData.filter((invoice) => invoice.status === filterStatus);
    }
  
    if (filterService !== 'all') {
      inputData = inputData.filter((invoice) =>
        invoice.items.some((c) => c.service === filterService)
      );
    }
  
    if (filterStartDate && filterEndDate) {
      inputData = inputData.filter(
        (invoice) =>
          fTimestamp(invoice.createDate) >= fTimestamp(filterStartDate) &&
          fTimestamp(invoice.createDate) <= fTimestamp(filterEndDate)
      );
    } */
  
    return inputData;
  }