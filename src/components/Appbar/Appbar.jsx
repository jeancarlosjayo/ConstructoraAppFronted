import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useStylesAppbar } from "./Appbar.css";
import { userContext } from "../../context/userContext";
import { LOGOUT_USER } from "../../types/userTypes";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";

const Appbar = (props) => {
  const router = useHistory();

  const classes = useStylesAppbar();

  const { userinit, dispatch } = useContext(userContext);

  const handleLogout = () => {
    dispatch({
      type: LOGOUT_USER,
      payload: false,
    });
  };

  const { name, profilepic } = userinit;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" className={classes.appbar}>
        <Toolbar>
          <div
            className={classes.title}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Typography style={{ marginRight: 5 }} variant="h5">
              App
            </Typography>
            <Typography variant="h5" color="secondary">
              Constructora
            </Typography>
          </div>
          <Typography
            variant="h5"
            className={classes.option}
            onClick={() => router.push("/codigos")}
          >
            Activaciones y Extensiones
          </Typography>
          <Typography
            variant="h5"
            className={classes.option}
            onClick={() => router.push("/lista-obras")}
          >
            Nuestras obras
          </Typography>
          <Typography variant="h5" className={classes.option}>
            Facturación
          </Typography>
          {profilepic === "null" ? (
            <Avatar alt={name} />
          ) : (
            <Avatar alt={name} src={profilepic} />
          )}
          <IconButton onClick={handleClick}>
            <ExpandMoreIcon style={{ color: "white" }} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className={classes.popover}>
              <Typography
                variant="h5"
                onClick={() => router.push("/perfil")}
                style={{ cursor: "pointer" }}
              >
                Mi perfil
              </Typography>
              <br></br>
              <Typography
                variant="h5"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Cerrar Sesión
              </Typography>
            </div>
          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
