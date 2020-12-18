import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
}from "@material-ui/core";
import React , { useContext }from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useStylesAppbar } from "./Appbar.css";
import { userContext } from "../../context/userContext";
import { LOGOUT_USER } from "../../types/userTypes"
  
    const Appbar = (props) => {

    const { open, setOpen } = props;

    const classes =  useStylesAppbar();

    const { dispatch } = useContext(userContext)
  
    const handleOpen = () => {
      setOpen(true);
    };

    const handleLogout = () => {
      dispatch({
        type:LOGOUT_USER,
        payload:false
      })
    }
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary" className={classes.appbar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="menu" onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" className={classes.title} style={{marginLeft:'10px'}}>
                <div className={classes.banner_title}>
                        <Typography className={classes.logo_title}>Constructora</Typography>
                        <Typography 
                        className={classes.logo_title}
                        style={{textAlign:'end'}}>Futuro</Typography>
                </div>
            </Typography>
            <IconButton color="inherit" onClick={handleLogout} >
              <ExitToAppIcon></ExitToAppIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  
  export default Appbar;
  