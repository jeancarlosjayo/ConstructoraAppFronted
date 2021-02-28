import { makeStyles } from "@material-ui/core/styles";

export const useStylesFormCode = makeStyles((theme) => ({
  container: {
    width: "360px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  btnGen: {
    background: "#FBE5C9",
    color: theme.palette.secondary.main,
    fontWeight: 600,
    "&:hover": {
      background: "#FBE5C9",
    },
  },
}));
