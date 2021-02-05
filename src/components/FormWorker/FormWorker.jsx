import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React , { useState, useEffect } from 'react'

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import es from "date-fns/locale/es";

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

const FormWorker = () => {

    const [worker, setWorker] = useState({
      name:'',
      lastname:'',
      dayborn: new Date(),
      typedoc:'',
      numberdoc:'',
      category:'',
      status:''
    })
    
    const [selectedDate, setSelectedDate] = React.useState(
      new Date()
    );

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    useEffect(() => {
      setWorker({
        ...worker,
        dayborn: selectedDate,

      });
    }, [selectedDate]);


    const handleChange = (e) =>{
      setWorker({
          ...worker,
          [e.target.name]:e.target.value
      })
    }


    console.log(worker)


    function getDateFormat(date) {
      const newDate = new Date(date);
      let year = newDate.getFullYear().toString();
      let month = (newDate.getMonth() + 1).toString();
      let day = newDate.getDate().toString();
    
      day.length == 1 && (day = '0' + day);
      month.length == 1 && (month = '0' + month);
      let yyyymmdd = day + '/' + month + '/' + year;
  
      return yyyymmdd;  
    }

    const handleNewWorker = () => {

      // firebase.database().ref('obreros').child(worker.numberdoc).on()

      // firebase.database().ref('/obreros/' + worker.numberdoc).once('value')
      // .then((snapshot)=>{
      //   if(snapshot.exists){

      //   }else{
          
      //   }
      // })
      
      // firebase.database().ref('/obreros/' + worker.numberdoc).set({
      //   typedoc: worker.typedoc,
      //   dayborn: getDateFormat(worker.dayborn),
      //   dni: worker.numberdoc,
      //   name : worker.name,
      //   lastname: worker.lastname,
      //   obraid:'',
      //   category:worker.category,
      //   status:worker.status
      // }).catch(error =>{
      //   console.log(error)
      // })
      
      
      



    }


    return (
      <div style={{margin:'20px'}}>
        <Grid container spacing={2} style={{padding:'15px 0px'}}>
          <Grid item md={6} sm={6} xs={12}>
            <TextField
              fullWidth={true}
              type="email"
              label="Nombres del obrero"
              variant="outlined"
              placeholder="Ingrese nombres del obrero"
              onChange={handleChange}
              name="name"
              value={worker.name}
              autoComplete="off"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <TextField
              fullWidth={true}
              type="email"
              label="Apellidos del obrero"
              variant="outlined"
              placeholder="Ingrese apellidos del obrero"
              onChange={handleChange}
              name="lastname"
              value={worker.lastname}
              autoComplete="off"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} >
            <Grid item md={6} sm={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                        <KeyboardDatePicker
                            style={{width:'100%'}}
                            autoOk
                            minDate={new Date()}
                            variant="inline"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Fecha de nacimiento"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                            "aria-label": "change date",
                            }}
                        />
              </MuiPickersUtilsProvider>  
            </Grid>
        </Grid>
        <Grid container spacing={2} style={{padding:'15px 0px'}}>
          <Grid item md={6} sm={6} xs={12}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel id="demo-simple-select-outlined-label">
                Tipo de documento
              </InputLabel>
              <Select
                value={worker.typedoc}
                onChange={handleChange}
                label="Tipo de documento"
                name="typedoc"
              >
                <MenuItem value="">
                  <em>Escoger tipo de documento</em>
                </MenuItem>
                <MenuItem value="DNI">DNI</MenuItem>
                <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                <MenuItem value="Carnet de Extranjeria">Carnet de Extranjeria</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <TextField
              fullWidth={true}
              type="email"
              label="Numero de documento"
              variant="outlined"
              placeholder="Ingrese numero de documento"
              onChange={handleChange}
              name="numberdoc"
              value={worker.numberdoc}
              autoComplete="off"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{padding:'15px 0px'}}>
          <Grid item md={6} sm={6} xs={12}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel id="demo-simple-select-outlined-label">
                Categoria
              </InputLabel>
              <Select
                value={worker.category}
                onChange={handleChange}
                label="Tipo de documento"
                name="category"
              >
                <MenuItem value="">
                  <em>Escoger categoria</em>
                </MenuItem>
                <MenuItem value="Albañil">Albañil</MenuItem>
                <MenuItem value="Carpintero">Carpintero</MenuItem>
                <MenuItem value="Electricista">Electricista</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel id="demo-simple-select-outlined-label">
                Estado
              </InputLabel>
              <Select
                value={worker.status}
                onChange={handleChange}
                label="Tipo de documento"
                name="status"
              >
                <MenuItem value="">
                  <em>Escoger estado</em>
                </MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="De baja">De baja</MenuItem>
                <MenuItem value="Suspendido">Suspendido</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{display:'flex',justifyContent:'center'}}>
          <Button 
          variant="contained" 
          color="primary"
          onClick={handleNewWorker}>Registrar Obrero</Button>
        </div>
      </div>
    );
}

export default FormWorker
