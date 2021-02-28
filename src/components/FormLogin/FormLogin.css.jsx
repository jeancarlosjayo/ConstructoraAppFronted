import { makeStyles } from "@material-ui/core";
import foto from "../../assets/img/fondoLogin.svg";

export const useStylesFormLogin = makeStyles((theme) => ({
  fondo_login: {
    backgroundImage: `url(${foto})`,
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form_login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    height: "475px",
    width: "480px",
    padding: "30px",
  },
  form_title: {
    textAlign: "center",
    color: "black",
  },
  form_text_title: {
    fontSize: "30px",
  },
}));
