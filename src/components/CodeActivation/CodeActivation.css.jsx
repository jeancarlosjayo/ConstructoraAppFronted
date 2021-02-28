import { makeStyles } from "@material-ui/core/styles";

export const useStylesCodeActivation = makeStyles((theme) => ({
  container: {
    maxWidth: 1250,
    margin: "auto",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.24)",
    padding: "10px 20px",
  },
  btnAct: {
    height: "37px",
    background: "#FDD1A3",
    color: theme.palette.secondary.main,
    fontWeight: 600,
    textTransform: "initial",
    borderRadius: 30,
    "&:hover": {
      background: "#FDD1A3",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      borderRadius: "50px",
      padding: "20px",
    },
  },
}));
