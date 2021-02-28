import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import React from "react";
import FormCode from "../FormCode/FormCode";
import TableCode from "../TableCode/TableCode";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useStylesCodeActivation } from "./CodeActivation.css";
import AddIcon from "@material-ui/icons/Add";

const CodeActivation = () => {
  const classes = useStylesCodeActivation();

  const [open, setOpen] = React.useState(false);
  const [activate, setActivate] = React.useState([]);

  const obtenerData = () => {
    console.log("dataa");
    firebase
      .database()
      .ref("/codes")
      .child("activation")
      .once("value", function (snapshot) {
        const valores = Object.values(snapshot.val());
        setActivate(valores);
      });
  };

  const handleOpen = () => setOpen(!open);

  React.useEffect(() => {
    obtenerData();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h3" style={{ margin: "20px 0px" }}>
            Codigos de Activación
          </Typography>
          <Button
            variant="contained"
            // color="secondary"
            onClick={handleOpen}
            className={classes.btnAct}
          >
            Nuevo código <AddIcon />
          </Button>
        </div>
        <TableCode data={activate} />
      </div>
      <Dialog open={open} onClose={handleOpen} className={classes.dialog}>
        <DialogContent>
          <FormCode
            handleOpen={handleOpen}
            type="activation"
            obtenerData={obtenerData}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CodeActivation;
