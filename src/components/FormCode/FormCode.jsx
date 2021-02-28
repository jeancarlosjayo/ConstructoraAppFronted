import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import UpdateIcon from "@material-ui/icons/Update";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import es from "date-fns/locale/es";

import { fechaTimeStamp } from "../../helpers/Fechas";
import { useStylesFormCode } from "./FormCode.css";

const FormCode = ({ type, handleOpen, obtenerData }) => {
  const classes = useStylesFormCode();

  const [loading, setLoading] = React.useState(true);
  const [code, setCode] = React.useState(0);

  const handleCode = () => {
    setLoading(true);
    const codeRandom =
      Math.floor(Math.random() * (999999999 - 111111111)) + 111111111;
    setCode(codeRandom);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const [selectedDateInit, setSelectedDateInit] = React.useState(new Date());

  const handleDateChangeInit = (date) => {
    setSelectedDateInit(date);
  };

  const [selectedDateFinal, setSelectedDateFinal] = React.useState(new Date());

  const handleDateChangeFinal = (date) => {
    setSelectedDateFinal(date);
  };

  const [email, setEmail] = React.useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    const timeStamp = parseInt(new Date() / 1000);
    const query = {
      buildid: "",
      datefinish: fechaTimeStamp(selectedDateFinal),
      dateinit: type === "activation" ? fechaTimeStamp(selectedDateInit) : "",
      email: email,
      id: timeStamp,
      state: "inactivo",
      value: code,
    };
    console.log(query);

    if (type === "activation") {
      firebase
        .database()
        .ref("/codes/activation/" + timeStamp)
        .set(query)
        .then((res) => {
          obtenerData();
          handleOpen();
        })
        .catch((ex) => {
          console.log(ex);
        });
    } else {
      firebase
        .database()
        .ref("/codes/extension/" + timeStamp)
        .set(query)
        .then((res) => {
          obtenerData();
          handleOpen();
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  };

  React.useEffect(() => {
    handleCode();
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Nuevo código de {type === "activation" ? "Activacíon" : "Extensión"}
      </Typography>
      <div style={{ margin: "10px 0px" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <div style={{ display: "flex" }}>
            <h2>{code}</h2>
            <IconButton onClick={handleCode}>
              <UpdateIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div style={{ margin: "10px 0px" }}>
        {type === "activation" && (
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
            <KeyboardDatePicker
              style={{ width: "100%" }}
              autoOk
              minDate={new Date()}
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              label="Dia Inicio"
              value={selectedDateInit}
              onChange={handleDateChangeInit}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        )}
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          <KeyboardDatePicker
            style={{ width: "360px" }}
            autoOk
            minDate={new Date()}
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            margin="normal"
            label="Dia Final"
            value={selectedDateFinal}
            onChange={handleDateChangeFinal}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={{ margin: "5px 0px 15px 0px" }}>
        <TextField
          style={{ width: "360px" }}
          type="email"
          label="Email"
          variant="outlined"
          placeholder="Ingrese email"
          onChange={handleChangeEmail}
          name="email"
          value={email}
          autoComplete="off"
        />
      </div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        className={classes.btnGen}
        fullWidth
      >
        Generar Codigo
      </Button>
    </div>
  );
};

export default FormCode;
