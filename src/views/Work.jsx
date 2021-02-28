import { Button, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import TableWork from "../components/TableWork/TableWork";
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
    width: 90,
    "&:hover": {
      background: "#FFFFFF",
      color: "#979797",
    },
  },
  containerbutton: {
    background: "#FBE5C9",
    height: 45,
    width: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
}));

const Work = () => {
  const classes = useStyles();

  const [typeData, setTypeData] = React.useState("todos");

  const [dataWork, setDataWork] = React.useState([]);

  const obtenerData = () => {
    console.log("dataa");
    if (typeData === "activos") {
      firebase
        .database()
        .ref("/obras")
        .once("value", function (snapshot) {
          const obras = Object.values(snapshot.val());
          const newData = obras.filter((item) => item.state === "activado");
          console.log(newData);
          setDataWork(newData);
        });
    } else if (typeData === "registrados") {
      firebase
        .database()
        .ref("/obras")
        .once("value", function (snapshot) {
          const obras = Object.values(snapshot.val());
          const newData = obras.filter((item) => item.state === "registrado");
          console.log(newData);
          setDataWork(newData);
        });
    } else {
      firebase
        .database()
        .ref("/obras")
        .once("value", function (snapshot) {
          const obras = Object.values(snapshot.val());
          // const newData = obras.filter(item => item.state === 'registrado')
          console.log(obras);
          setDataWork(obras);
        });
    }
  };

  React.useEffect(() => {
    obtenerData();
  }, [typeData]);

  console.log(typeData);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ maxWidth: 1240, margin: "auto" }}>
        <Typography variant="h3" color="primary">
          Nuestras Obras
        </Typography>
        <div
          style={{
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.24)",
            padding: "5px 20px",
            margin: "20px 0px 0px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              margin: "10px 0px",
            }}
          >
            <div
              style={{
                background: "#FBE5C9",
                height: 45,
                width: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
              }}
            >
              <Button
                className={
                  typeData === "todos" ? classes.buttonActive : classes.button
                }
                onClick={() => setTypeData("todos")}
              >
                Todos
              </Button>
              <Button
                className={
                  typeData === "activos" ? classes.buttonActive : classes.button
                }
                onClick={() => setTypeData("activos")}
              >
                Activados
              </Button>
              <Button
                className={
                  typeData === "registrados"
                    ? classes.buttonActive
                    : classes.button
                }
                onClick={() => setTypeData("registrados")}
              >
                Registrados
              </Button>
            </div>
          </div>
          <br></br>
          <TableWork data={dataWork}></TableWork>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Work;
