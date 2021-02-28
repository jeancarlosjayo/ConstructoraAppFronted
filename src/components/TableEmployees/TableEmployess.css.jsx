import { makeStyles } from "@material-ui/core";

export const useStylesTableEmployees = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontSize: "12px !important",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  tableContainerStyle: {
    "&::-webkit-scrollbar": {
      height: "9px",
      width: "50px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "0px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#324463",
    },
    "&::-webkit-scrollbar-track": {
      background: "#EBEBEB",
      borderRadius: "2px",
    },
    "& .MuiTableSortLabel-root:hover": {
      color: "#000000",
    },
    "& .MuiTableSortLabel-root.MuiTableSortLabel-active": {
      color: "#000000",
    },
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  section_buscar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    float: "right",
    "@media(max-width:702px)": {
      justifyContent: "center",
      float: "none",
    },
  },
  btn_search: {
    border: "none",
    backgroundColor: "#02AAB0",
    height: "40px",
    margin: "7px",
    borderRadius: "12px",
    color: "white",
    outline: "none",
    "&:hover": {
      backgroundColor: "#00858a",
    },
    "&:active": {
      position: "relative",
      top: "1px",
    },
  },
  typography: {
    padding: theme.spacing(2),
  },

  btnlink: {
    color: "#2F1A7E",
    textTransform: "initial",
  },
  headerTable: {
    color: "red",
    "&:hover": {
      color: "red",
    },
  },
}));
