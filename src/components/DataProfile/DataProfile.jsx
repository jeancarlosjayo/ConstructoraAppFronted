import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { userContext } from "../../context/userContext";
import PeopleIcon from "@material-ui/icons/People";
import EmailIcon from "@material-ui/icons/Email";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { useStylesDataProfile } from "./DataProfile.css";
import PhoneIcon from "@material-ui/icons/Phone";
import PlaceIcon from "@material-ui/icons/Place";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const DataProfile = () => {
  const { userinit } = React.useContext(userContext);

  const { email, dayofbirth, cellphone } = userinit;

  const classes = useStylesDataProfile();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Typography className={classes.titlegrid}>
            <PeopleIcon style={{ marginRight: 15 }} />
            CARGO
          </Typography>
          <Typography style={{ marginLeft: 40 }}>
            Coordinadora de marketing digital
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Typography className={classes.titlegrid}>
            <EmailIcon style={{ marginRight: 15 }} />
            CORREO ELECTRONICO
          </Typography>
          <Typography style={{ marginLeft: 40 }}>{email}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Typography className={classes.titlegrid}>
            <DateRangeIcon style={{ marginRight: 15 }} />
            FECHA DE NACIMIENTO
          </Typography>
          <Typography style={{ marginLeft: 40 }}>{dayofbirth}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Typography className={classes.titlegrid}>
            <PhoneIcon style={{ marginRight: 15 }} />
            TELEFONO
          </Typography>
          <Typography style={{ marginLeft: 40 }}>{cellphone}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Typography className={classes.titlegrid}>
            <PlaceIcon style={{ marginRight: 15 }} />
            DIRECCIÓN
          </Typography>
          <Typography style={{ marginLeft: 40 }}>
            Avenida Independecia Giron ayacucho #457
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Typography className={classes.titlegrid}>
            <VpnKeyIcon style={{ marginRight: 15 }} />
            CONTRASEÑA
          </Typography>
          <Typography style={{ marginLeft: 40 }}>***************</Typography>
        </Grid>
      </Grid>
      <div className={classes.containerbutton}>
        <Button variant="contained" className={classes.btnUdpate}>
          ACTUALIZAR DATOS
        </Button>
      </div>
    </>
  );
};

export default DataProfile;
