import {
    AppBar,
    Button,
    Toolbar,
    Typography,
}from "@material-ui/core";
import React , { useContext }from "react";
import { useStylesAppbar } from "./Appbar.css";
import { userContext } from "../../context/userContext";
import { LOGOUT_USER } from "../../types/userTypes"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

    const Appbar = (props) => {


    const classes =  useStylesAppbar();

    const { dispatch } = useContext(userContext)

    const handleLogout = () => {
      dispatch({
        type:LOGOUT_USER,
        payload:false
      })
    }
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary" className={classes.appbar}>
          <Toolbar>
            <div className={classes.title} style={{marginLeft:'10px'}}>
            <Typography style={{marginRight:5}} variant="h5">
                App 
            </Typography>
            <Typography variant="h5" color="secondary">
                 Constructora 
            </Typography>
            </div>
            <Typography variant="h5" style={{marginRight:25}}>
                 Obras
            </Typography>
            <Typography variant="h5" style={{marginRight:25}}>
                 Codigo de Activación 
            </Typography>
            <Typography variant="h5" style={{marginRight:25}}>
                 Codigo de Extensión 
            </Typography>
            <Button color="inherit" onClick={handleLogout} style={{textTransform:'initial'}}>
              <Typography variant="h5" style={{marginRight:5}} >
                  Cerrar Sesión
              </Typography>
            <PowerSettingsNewIcon/>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  
  export default Appbar;
  