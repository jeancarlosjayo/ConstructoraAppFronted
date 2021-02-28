import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStylesGridOption } from "./GridOption.css";

const GridOption = () => {
  const router = useHistory();
  const classes = useStylesGridOption();

  return (
    <div>
      <Grid container style={{ maxWidth: "1440px", margin: "auto" }}>
        <Grid item md={4} xs={12}>
          <div className={classes.fondoCodigo}>
            <div style={{ maxWidth: 170, textAlign: "end" }}>
              <Typography style={{ fontSize: 20, fontWeight: 800 }}>
                Activiaciones y extensiones
              </Typography>
              <Button
                className={classes.btnExplorar}
                onClick={() => router.push("/codigos")}
              >
                Explorar
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className={classes.fondoObras}>
            <div style={{ maxWidth: 170, textAlign: "end" }}>
              <Typography style={{ fontSize: 20, fontWeight: 800 }}>
                Nuestras obras
              </Typography>
              <Button
                className={classes.btnExplorar}
                onClick={() => router.push("/lista-obras")}
              >
                Explorar
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className={classes.fondoFactura}>
            <div style={{ maxWidth: 170, textAlign: "end" }}>
              <Typography style={{ fontSize: 20, fontWeight: 800 }}>
                Facturación
              </Typography>
              <Button className={classes.btnExplorar}>Explorar</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default GridOption;
