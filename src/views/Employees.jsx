import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import DetailWork from "../components/DetailWork/DetailWork";
import Footer from "../components/Footer/Footer";
import TableEmployees from "../components/TableEmployees/TableEmployees";
import { db } from "../firebase/firebase.config";

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
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Employees = () => {
  const classes = useStyles();

  const { id } = useParams();

  const [dataWork, setDataWork] = React.useState({
    name: "",
    datestart: "",
    datefinished: "",
    buildersnum: "",
    buildpic: "",
    description: "",
  });

  const [numResponsables, setNumresposanbles] = React.useState(0)

  const [ris, setRis] = React.useState({
    data:[]
  });
  const [worker, setWorker] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [typeData, setTypeData] = React.useState("todos");

  const obtemerDatosObra = async () => {
    await db
      .ref("/obras")
      .child(id)
      .once("value", function (snapshot) {
        const {
          name,
          datestart,
          datefinished,
          buildpic,
          buildersnum,
          description,
        } = snapshot.val();
        setDataWork({
          ...dataWork,
          name,
          description,
          datestart,
          datefinished,
          buildpic,
          buildersnum,
        });
      });
  };

  const obtenerRisObra = async () => {
    await db.ref("/RIS").once("value", function (snapshot) {
      if (snapshot.exists) {
        const arrayRis = Object.values(snapshot.val());
        const risData = arrayRis.filter(item => item.buildid === id)
        setRis({
          ...ris,
          data: risData
        })
        cantidadReposanbles(risData.length)
      }
    });
  };

  const cantidadReposanbles = (num) => {
    console.log(num)
    setNumresposanbles(num)
  }

  const datosUser = async(id) => {
    let cellphone
    await db.ref('/users').child(id).once("value", function (snapshot) {
      cellphone = snapshot.val().cellphone;
      console.log(cellphone);
      
    }).then(res => console.log(res));
    return cellphone
  }

  const obtenerWorkerObra = async () => {
    await db.ref("/obreros").once("value", function (snapshot) {
      if (snapshot.exists) {
        const arrayWorker = Object.values(snapshot.val());
        const worker = arrayWorker.filter((item) => item.buildid === id);
        setWorker(worker);
      }
    });
  };


  const typeDataWorkers = (type) => {
    setTypeData(type);
    if (type === "todos") {
      const arary = ris.data.concat(worker);
      setData(arary);
    } else if (type === "responsables") {
      setData(ris.data);
    } else {
      setData(worker);
    }
  };

  const obtenerDataTable = () => {
    const arary = ris.data.concat(worker);
    setData(arary);
  };


  React.useEffect(() => {
    obtemerDatosObra();
    obtenerRisObra();
    obtenerWorkerObra();
  }, []);

  React.useEffect(() => {
    obtenerDataTable();
  }, [ris, worker]);

  console.log(data);

  return (
    <>
      <Grid container style={{ maxWidth: 1300, margin: "auto" }}>
        <Grid item xs={12} md={4} style={{ height: "676px", padding: 5 }}>
          <div
            style={{
              boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
              height: "657px",
              borderRadius: 10,
            }}
          >
            <DetailWork dataWork={dataWork} numResponsables={numResponsables}/>
          </div>
        </Grid>
        <Grid item xs={12} md={8} style={{ height: "676px", padding: 5 }}>
          <div
            style={{
              boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
              height: "657px",
              borderRadius: 10,
              padding: "30px 10px",
            }}
          >
            <div className={classes.header}>
              <Typography variant="h4">Lista de empleados</Typography>
              <div className={classes.containerbutton}>
                <Button onClick={() => typeDataWorkers("todos")}
                className={typeData === 'todos' ? classes.buttonActive : classes.button}>Todos</Button>
                <Button onClick={() => typeDataWorkers("responsables")}
                 className={typeData === 'responsables' ? classes.buttonActive : classes.button}>
                  Responsables
                </Button>
                <Button onClick={() => typeDataWorkers("obreros")}
                 className={typeData === 'obreros' ? classes.buttonActive : classes.button}>
                  Obreros
                </Button>
              </div>
            </div>
            <br></br>
            <TableEmployees data={data} />
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Employees;
