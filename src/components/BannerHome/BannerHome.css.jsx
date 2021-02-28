import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import banner from "../../assets/img/fondoInicio.svg";

export const useStylesBannerHome = makeStyles((theme) => ({
  banner: {
    backgroundImage: `url(${banner})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "350px",
    marginTop: "-40px",
    color: "white",
    textAlign: "center",
    padding: 50,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 35,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 400,
  },
}));
