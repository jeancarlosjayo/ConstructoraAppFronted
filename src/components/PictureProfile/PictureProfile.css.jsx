import { makeStyles } from "@material-ui/core/styles";

export const useStylesPictureProfile = makeStyles((theme) => ({
  container: {
    maxWidth: 600,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    marginTop: "-120px",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonPicture: {
    background: "#FBE5C9",
    width: "42px",
    minWidth: "42px",
    height: "42px",
    "&:hover": {
      background: "#FBE5C9",
    },
  },
}));
