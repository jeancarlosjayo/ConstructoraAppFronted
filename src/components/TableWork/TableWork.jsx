import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, withStyles } from '@material-ui/core';
import React from 'react'
import { useStylesTableWork } from './TableWork.css';

//Estilos de la tabla del encabezado y contenido
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      minWidth: "165px",
      "&:hover":{
        color: "white",
      }
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  //Creando data de la tabla
  function createData(
    id,
    name,
    state,
    // stateampliation,
    codeaccess,
    // codeampliation,
    // timestart,
    // timefinish,
    datestart,
    datefinished,
    // admin
  ) {
    return { id, name, state, 
      // stateampliation, 
      codeaccess, 
      // codeampliation, 
      // timestart,
      // timefinish,
      datestart,datefinished,
      // admin 
    };
  }
  
  //Ascendente y descendente de la tabla
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  //Encabezados de la tabla
  const headCells = [
    {id: "id",numeric: true,disablePadding: false,label: "Id Obra"},
    {id: "name",numeric: true,disablePadding: false,label: "Nombre"},
    { id: "state", numeric: false, disablePadding: false, label: "Estado Activación" },
    // { id: "stateampliation", numeric: false, disablePadding: false, label: "Estado Ampliación" },
    { id: "codeaccess", numeric: false, disablePadding: false, label: "Codigo Activacón" },
    // { id: "codeampliation", numeric: false, disablePadding: false, label: "Codigo Ampliación" },
    // { id: "timestart", numeric: false, disablePadding: false, label: "Hora Entrada" },
    // { id: "timefinish", numeric: false, disablePadding: false, label: "Hora Salida" },
    { id: "datestart", numeric: false, disablePadding: false, label: "Fecha Inicio" },
    { id: "datefinished", numeric: false, disablePadding: false, label: "Fecha Fin" },
    // { id: "admin", numeric: false, disablePadding: false, label: "Admin" },


  ];
  
  //Creacion del encabezado
  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
  
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <StyledTableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align="center"
              // align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
    );
  }


const TableWork = ({data}) => {

        const classes = useStylesTableWork();

        //state del componente
        const [order, setOrder] = React.useState("asc");
        const [orderBy, setOrderBy] = React.useState("calories");
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
      
        //handle change
        const handleRequestSort = (event, property) => {
          const isAsc = orderBy === property && order === "asc";
          setOrder(isAsc ? "desc" : "asc");
          setOrderBy(property);
        };
      
        // data
        const sales1 = data.map((item) => {
          return createData(
            item.id,
            item.name,
            item.state,
            item.stateampliation,
            item.codeaccess,
            item.codeampliation,
            item.timestart,
            item.timefinish,
            item.datestart,
            item.datefinished,
            item.admin
          );
        });
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };
      
        const emptyRows =
          rowsPerPage - Math.min(rowsPerPage, sales1.length - page * rowsPerPage);
      
    return (
          <div>
            <Paper className={classes.paper} >
              <TableContainer className={classes.tableContainerStyle} >
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                  // id="pdfdiv"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={sales1.length}
                  />
                  <TableBody>
                    {stableSort(sales1, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // if (row.status === 1) {
                        return (
                          <StyledTableRow tabIndex={-1} key={index}>
                            <StyledTableCell align="center">
                              {row.id}
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              id={labelId}
                              align="center"
                              scope="row"
                              padding="none"
                            >
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.state}
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">
                              {row.stateampliation}
                            </StyledTableCell> */}
                            <StyledTableCell align="center">
                              {row.codeaccess}
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">
                              {row.codeampliation}
                            </StyledTableCell> */}
                            {/* <StyledTableCell align="center">
                              {row.timestart}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.timefinish}
                            </StyledTableCell> */}
                            <StyledTableCell align="center">
                              {row.datestart}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.datefinished}
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">
                              {row.admin}
                            </StyledTableCell> */}
                          </StyledTableRow>
                        );
                      })}
      
                    {emptyRows > 0 && (
                      <TableRow>
                        <StyledTableCell colSpan={14} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                labelRowsPerPage="Filas por Página"
                component="div"
                count={sales1.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
    )
}

export default TableWork
