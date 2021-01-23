
import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { workContext } from '../../context/workContext'
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary'
import { useStylesSteepComplete } from './SteepComplete.css'
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

const SteepComplete = ({handleReset}) => {


    const {workinit} = React.useContext(workContext)
    

    const classes= useStylesSteepComplete()

    const handleConfirm = () => {

        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);

        firebase.database().ref('/obras/' + timestamp).set({
            datefinished: workinit.day_init,
            datestart: workinit.day_final,
            id: timestamp,
            name : workinit.namework,
            timefinish: workinit.time_init,
            timestart: workinit.time_final,
          });

        for(const dni of workinit.workers){
            firebase.database().ref("obreros").child(dni).child("obraid").set(timestamp)
        }
        
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>{workinit.namework}</Typography>
            <Grid container className={classes.grid}>
                <Grid item md={6} sm={6} xs={12} className={classes.griditem}>
                    <strong>Fecha Inicial:</strong> {workinit.day_init}
                </Grid>
                <Grid item md={6} sm={6} xs={12} className={classes.griditem}>
                    <strong>Fecha Final:</strong> {workinit.day_final}
                </Grid>
            </Grid>
            <Grid container className={classes.grid}>
                <Grid item md={6} sm={6} xs={12} className={classes.griditem}>
                    <strong>Hora de Entrada:</strong> {workinit.time_init}
                </Grid>
                <Grid item md={6} sm={6} xs={12} className={classes.griditem}>
                    <strong>Hora de Salida:</strong> {workinit.time_final}
                </Grid>
            </Grid>
            <Grid container className={classes.grid}>
                <Grid item md={6} sm={6} xs={12} className={classes.griditem}>
                    <strong>Encargado de Asistencia:</strong> {workinit.workris}
                </Grid>
                <Grid item md={6} sm={6} xs={12} className={classes.griditem}>
                    <strong>Email para Reportes:</strong> {workinit.emailreport}
                </Grid>
            </Grid>
            <Typography className={classes.grid} style={{textAlign:'center'}}><strong>Obreros</strong></Typography>
            <Grid container className={classes.grid}>
                <Grid item md={6} sm={6} xs={6} className={classes.griditem}>
                    <Typography><strong>Nombre</strong></Typography>
                    {
                        workinit.workersname.map(item =>{
                            return <Typography>{item}</Typography>
                        })
                    }
                </Grid>
                <Grid item md={6} sm={6} xs={6} className={classes.griditem}>
                    <Typography><strong>DNI</strong></Typography>
                    {
                        workinit.workers.map(item =>{
                            return <Typography>{item}</Typography>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container className={classes.grid}>
                <Grid item md={6} sm={6} xs={12} className={classes.griditembtn}>
                    <ButtonPrimary text="Confirmar" onClick={handleConfirm}></ButtonPrimary>
                </Grid>
                <Grid item md={6} sm={6} xs={12} className={classes.griditembtn}>
                    <ButtonPrimary text="Rehacer" onClick={handleReset}></ButtonPrimary>
                </Grid>
            </Grid>        
        </div>
    )
}

export default SteepComplete
