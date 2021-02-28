import { makeStyles } from "@material-ui/core";
import fondoCode from "../../assets/img/fondoCode.svg";
import fondoObra from "../../assets/img/fondoObra.svg";
import fondoFac from "../../assets/img/fondoFact.svg";

export const useStylesGridOption = makeStyles((theme) => ({
  fondoCodigo: {
    backgroundImage: `url(${fondoCode})`,
    backgroundPosition: "center",
    width: "310px",
    height: "245px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "10px",
    color: "white",
  },
  fondoObras: {
    backgroundImage: `url(${fondoObra})`,
    backgroundPosition: "center",
    width: "310px",
    height: "245px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "10px",
    color: "white",
  },
  fondoFactura: {
    backgroundImage: `url(${fondoFac})`,
    backgroundPosition: "center",
    width: "310px",
    height: "245px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "10px",
    color: "white",
  },
  btnExplorar: {
    color: "white",
    background: "rgba(196, 196, 196, 0.4);",
    borderRadius: "30px",
    border: "1px solid #FFFFFF",
    width: 86,
    textTransform: "initial",
  },
}));
