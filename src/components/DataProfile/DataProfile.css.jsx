import { makeStyles } from "@material-ui/core/styles";

export const useStylesDataProfile = makeStyles((theme) => ({
  container: {
    maxWidth: 900,
    margin: "auto",
    marginTop: 40,
  },
  gridItem: {
    boxShadow: "2px 2px 2px 1px  rgba(0, 0, 0, 0.1)",
    padding: "10px 20px",
    margin: "10px 0px",
  },
  titlegrid: {
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
  },
  containerbutton: {
    display: "flex",
    justifyContent: "center",
    margin: "16px 0px 0px 0px",
  },
  btnUdpate: {
    color: theme.palette.secondary.main,
    background: "#FBE5C9",
    "&:hover": {
      background: "#FBE5C9",
    },
  },
}));
