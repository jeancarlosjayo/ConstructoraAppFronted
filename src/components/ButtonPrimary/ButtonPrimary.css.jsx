import { makeStyles } from "@material-ui/core";

export const useStylesButtonPrimary = makeStyles((theme) => ({
  button_primary: {
    background: theme.palette.secondary.main,
    textTransform: "initial",
    // width: "220px",
    color: "white",
    height: "45px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
  button_text: {
    fontSize: "18px",
    fontWeight: 700,
  },
}));
