import { Typography, Grid } from "@material-ui/core";
import React from "react";
import picBuild from "../../assets/img/picbuild.svg";

const DetailWork = ({ dataWork,numResponsables }) => {
  const {
    name,
    datestart,
    datefinished,
    buildersnum,
    buildpic,
    description,
  } = dataWork;
  return (
    <div style={{ padding: "30px 10px" }}>
      <Typography variant="h4">{name}</Typography>
      <br></br>
      <div style={{ width: 382, height: 220 }}>
        <img
          src={buildpic ? buildpic : picBuild}
          alt={buildpic}
          style={{ width: "100%", height: "100%" }}
        ></img>
      </div>
      <br></br>
      <Typography variant="h5">Descripción</Typography>
      <Typography>{description}</Typography>
      <br></br>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h5">Fecha de inicio</Typography>
          <Typography>{datestart}</Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5">Fecha de fin</Typography>
          <Typography>{datefinished}</Typography>
        </Grid>
      </Grid>
      <br></br>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h5">Nro de responsables</Typography>
          <Typography>{numResponsables}</Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5">Nro de trabajadores</Typography>
          <Typography>{buildersnum}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailWork;
