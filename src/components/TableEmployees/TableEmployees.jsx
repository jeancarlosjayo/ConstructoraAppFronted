import {
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStylesTableEmployees } from "./TableEmployess.css";

//Estilos de la tabla del encabezado y contenido
const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: "white",
    // color: "#000000",
    minWidth: "165px",
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
  },
}))(TableRow);

//Creando data de la tabla
function createData(name, direction, email, phone) {
  return {
    name,
    direction,
    email,
    phone,
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
  { id: "name", numeric: true, disablePadding: false, label: "Nombre" },
  {
    id: "direction",
    numeric: false,
    disablePadding: false,
    label: "Dirección",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Telefono",
  },
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
            // padding={headCell.disablePadding ? "none" : "default"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {/* {order === "desc" ? "sorted descending" : "sorted ascending"} */}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

const TableWork = ({ data }) => {
  console.log(data);

  const classes = useStylesTableEmployees();

  //state del componente
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  //handle change
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // data
  const sales1 = data.map((item) => {
    return createData(
      item.name ? item.name : `${item.names} ${item.lastnamefirst}`,
      item.address ? item.address : "Sin asignar",
      item.email ? item.email : "Sin asignar",
      item.cellphone ? item.cellphone : "Sin asignar"
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

  const stateStyle = (state) => {
    let color = "#3CC13B";
    if (state === "registrado") {
      color = "#F03738";
    }
    return {
      color,
      fontWeigth: 400,
      border: `1px solid ${color}`,
      width: 100,
      marginLeft: 30,
    };
  };

  const router = useHistory();

  return (
    <div>
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableContainerStyle}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            padding="default"
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
                      <StyledTableCell align="center" padding="none">
                        <Typography
                          style={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Avatar
                            alt={row.name}
                            src=""
                            style={{
                              width: "20px",
                              height: "20px",
                              margin: "0px 15px",
                            }}
                          />
                          {row.name}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        align="center"
                        scope="row"
                        padding="none"
                      >
                        {row.direction}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.phone}
                      </StyledTableCell>
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
  );
};

export default TableWork;
