import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import CodeActivation from "../components/CodeActivation/CodeActivation";
import CodeExtension from "../components/CodeExtention/CodeExtension";
import Footer from "../components/Footer/Footer";
const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "initial",
    background: "transparent",
    color: theme.palette.secondary.main,
    padding: "0px 10px",
  },
  buttonActive: {
    textTransform: "initial",
    background: "#FFFFFF",
    color: "#979797",
    borderRadius: 30,
    width: 200,
    "&:hover": {
      background: "#FFFFFF",
      color: "#979797",
    },
  },
  containerButtons: {
    background: "#FBE5C9",
    height: 45,
    width: 450,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
}));

const Codes = () => {
  const classes = useStyles();
  const [activate, setActivate] = React.useState(true);

  const handleActivate = () => setActivate(true);
  const handleExtention = () => setActivate(false);

  return (
    <>
      <div style={{ maxWidth: 1250, margin: "auto", position: "relative" }}>
        <div className={classes.containerButtons}>
          <Button
            className={activate ? classes.buttonActive : classes.button}
            onClick={handleActivate}
          >
            CÓDIGO DE ACTIVACIÓN
          </Button>
          <Button
            className={!activate ? classes.buttonActive : classes.button}
            onClick={handleExtention}
          >
            CÓDIGO DE EXTENSIÓN
          </Button>
        </div>
        <br></br>
        {activate ? <CodeActivation /> : <CodeExtension />}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Codes;
