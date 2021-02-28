import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import React from "react";
import FormCode from "../FormCode/FormCode";
import TableCode from "../TableCode/TableCode";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useStylesCodeExtention } from "./CodeExtension.css";
import AddIcon from "@material-ui/icons/Add";

const CodeExtension = () => {
  const classes = useStylesCodeExtention();

  const [open, setOpen] = React.useState(false);
  const [extension, setExtension] = React.useState([]);

  const obtenerData = () => {
    console.log("dataa");
    firebase
      .database()
      .ref("/codes")
      .child("extension")
      .once("value", function (snapshot) {
        const valores = Object.values(snapshot.val());
        setExtension(valores);
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
            Codigos de Extensión
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
        <TableCode data={extension} />
      </div>
      <Dialog open={open} onClose={handleOpen} className={classes.dialog}>
        <DialogContent>
          <FormCode
            handleOpen={handleOpen}
            type="extension"
            obtenerData={obtenerData}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CodeExtension;
