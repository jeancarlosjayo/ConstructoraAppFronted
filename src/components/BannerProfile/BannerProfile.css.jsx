
import { makeStyles } from "@material-ui/core/styles";
import bannerProfile from "../../assets/img/bannerPerfil.svg";

export const useStylesBannerProfile = makeStyles((theme) => ({
  banner: {
    backgroundImage: `url(${bannerProfile})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "200px",
    marginTop: "-40px",
    color: "white",
    textAlign: "center",
    padding: 50,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}))
