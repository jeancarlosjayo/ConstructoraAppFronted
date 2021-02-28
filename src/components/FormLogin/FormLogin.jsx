import {
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { userContext } from "../../context/userContext";
import { LoginwithFirebase, UserType } from "../../firebase/firebase.config";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { useStylesFormLogin } from "./FormLogin.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

import background from "../../assets/img/fondoLogin.svg";
import logo from "../../assets/img/logoLogin.svg";
import logoFb from "../../assets/img/logoFb.svg";
import logoInsta from "../../assets/img/logoInsta.svg";
import logoLinkedin from "../../assets/img/logoLink.svg";
import logoYt from "../../assets/img/logoYt.svg";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import {
  ADD_OTHERDATOS_USER,
  ADD_UID_USER,
  LOGIN_USER,
} from "../../types/userTypes";

const FormLogin = () => {
  const classes = useStylesFormLogin();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = login;

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const { dispatch } = useContext(userContext);

  const LoginwithFirebase = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const uid = user.user.uid;
        dispatch({
          type: ADD_UID_USER,
          payload: uid,
        });
        UserType(uid);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const UserType = (uid) => {
    firebase
      .database()
      .ref("/users/" + uid)
      .once("value")
      .then((snapshot) => {
        const type = snapshot.val() && snapshot.val().type;
        const name = snapshot.val() && snapshot.val().name;
        const email = snapshot.val() && snapshot.val().email;
        const cellphone = snapshot.val() && snapshot.val().cellphone;
        const dayofbirth = snapshot.val() && snapshot.val().dayofbirth;
        const profilepic = snapshot.val() && snapshot.val().profilepic;

        dispatch({
          type: ADD_OTHERDATOS_USER,
          payload: {
            type,
            name,
            email,
            cellphone,
            dayofbirth,
            profilepic
          },
        });
        dispatch({
          type: LOGIN_USER,
          payload: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    LoginwithFirebase(email, password);
  };

  return (
    <div className={classes.fondo_login}>
      <div className={classes.container_login}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <img src={logo} alt="logo"></img>
        </div>
        <div className={classes.form_login}>
          <div className={classes.form_title}>
            <Typography variant="h5" className={classes.form_text_title}>
              Bienvenido a tu App Cosntructora
            </Typography>
          </div>
          <br></br>
          <br></br>
          <TextField
            type="email"
            label="Correo Electrónico"
            variant="outlined"
            placeholder="Ingrese correo electrónico"
            onChange={handleChange}
            name="email"
            value={email}
            fullWidth
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <br></br>
          <TextField
            type="password"
            label="Contraseña"
            variant="outlined"
            placeholder="Ingrese contraseña"
            onChange={handleChange}
            name="password"
            value={password}
            autoComplete="off"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <br></br>
          <br></br>
          <ButtonPrimary text="INGRESAR" onClick={handleLogin} />
          <br></br>
          <Divider style={{ background: "#C4C4C4", width: "50%" }}></Divider>
          <Button style={{ textTransform: "initial" }}>
            Olvidate tu contraseña
          </Button>
          <br></br>
          <div>
            <img src={logoFb} alt="logoFb" style={{ margin: "0px 8px" }}></img>
            <img
              src={logoInsta}
              alt="logoInsta"
              style={{ margin: "0px 8px" }}
            ></img>
            <img
              src={logoLinkedin}
              alt="logoLinkedin"
              style={{ margin: "0px 8px" }}
            ></img>
            <img src={logoYt} alt="logoYt" style={{ margin: "0px 8px" }}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
