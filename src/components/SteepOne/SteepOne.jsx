/* eslint-disable eqeqeq */
import { Button, Grid, TextField } from '@material-ui/core'
import React , { useState , useEffect, useContext } from 'react'
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import es from "date-fns/locale/es";

// import firebase from 'firebase/app';
// import "firebase/auth";
// import "firebase/database"

import { useStylesSteppOne } from './SteepOne.css'
import { workContext } from '../../context/workContext';
import { STEPONE_WORK } from '../../types/workTypes';

const SteepOne = ({handleNext,handleBack}) => {


    const classes = useStylesSteppOne()

    const [ obra, setObra ] = useState({
        name:'',
        day_init: new Date(),
        day_final: new Date(),
        hour_init: new Date(),
        hour_final: new Date()
    })

    const handleChange = (e) =>{
        setObra({
            ...obra,
            [e.target.name]:e.target.value
        })
    }

    const [selectedDate, setSelectedDate] = React.useState(
        new Date()
    );

    const [selectedDate1, setSelectedDate1] = React.useState(
        new Date()
    );

    const [selectedDate2, setSelectedDate2] = React.useState(
        new Date()
    );

    const [selectedDate3, setSelectedDate3] = React.useState(
        new Date()
      );

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };
    
    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };

    const handleDateChange3 = (date) => {
        setSelectedDate3(date);
    };

    useEffect(() => {
        setObra({
          ...obra,
          day_init: selectedDate,
          day_final: selectedDate1,
          hour_init: selectedDate2,
          hour_final: selectedDate3,
        });
      }, [selectedDate,selectedDate1,selectedDate2,selectedDate3]);


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
      

      function getDatetimeFormat(date) {
        // let yyyymmdd = getDateFormat(date);
        
        const newDate = new Date(date)
        let hour = '' + newDate.getHours();
        if (hour.length == 1) {
          hour = '0' + hour;
        }
      
        let minute = '' + newDate.getMinutes();
        if (minute.length == 1) {
          minute = '0' + minute;
        }
      
        let second = '' + newDate.getSeconds();
        if (second.length == 1) {
          second = '0' + second;
        }
      
        // return yyyymmdd + ' ' + hour + ':' + minute + ':' + second;
        return  hour + ':' + minute + ':' + second;
    
      }


    const {dispatchwork} = useContext(workContext)


    const handleEnvio = async () =>{

        await dispatchwork({
            type: STEPONE_WORK,
            payload:{
                namework: obra.name,
                day_init: getDateFormat(obra.day_init),
                day_final: getDateFormat(obra.day_final),
                time_init: getDatetimeFormat(obra.hour_init),
                time_final: getDatetimeFormat(obra.hour_final), 
            }
        })

        handleNext()

        // const dateTime = Date.now();
        // const timestamp = Math.floor(dateTime / 1000);

        // firebase.database().ref('/obras/' + timestamp).set({
        //     datefinished: getDateFormat(obra.day_final),
        //     datestart: getDateFormat(obra.day_init),
        //     id: timestamp,
        //     name : obra.name,
        //     timefinish: getDatetimeFormat(obra.hour_final),
        //     timestart: getDatetimeFormat(obra.hour_init),
        //   });
    }
    

    // const [data,setData] = useState({
    //     datos:[]
    // })


    // const array = []

    // const algo = (array) =>{
    //     setData({
    //         datos:array
    //     })
    // }

    // const intento = () =>{
    //     firebase.database().ref('/obras').once('value',function(snapshot){
    //         snapshot.forEach(
    //             function(ChildSnapshot){
    //                 let datefinished = ChildSnapshot.val().datefinished
    //                 let name = ChildSnapshot.val().name
    //                 let objeto ={
    //                     datefinished,
    //                     name
    //                 }
    //                 array.push(objeto)
    //                 console.log(array)
    //                 algo(array)
    //             }
    //         )
    //     })
    // }
         
    

    return ( 
        <div style={{margin:'20px'}}>
            <Grid container className={classes.containerfield}>
                <Grid item xs={12} md={12}>
                    <TextField
                    fullWidth={true}
                    type="email"
                    label="Nombre de la obra "
                    variant="outlined"
                    placeholder="Ingrese nombre de la obra"
                    onChange={handleChange}
                    name="name"
                    value={obra.name}
                    autoComplete="off"
                    />
                </Grid>
            </Grid>
            <Grid container className={classes.containerfield} >
                <Grid item xs={12} sm={6} md={6} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                        <KeyboardDatePicker
                            style={{width:'95%'}}
                            autoOk
                            minDate={new Date()}
                            variant="inline"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Fecha de inicio"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                            "aria-label": "change date",
                            }}
                            // name="day_init"
                        />
                      </MuiPickersUtilsProvider>  
                </Grid>
                <Grid item xs={12} sm={6} md={6} style={{display:'flex',justifyContent:'flex-end'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                        <KeyboardDatePicker
                            style={{width:'95%'}}
                            autoOk
                            minDate={new Date()}
                            variant="inline"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Fecha de fin"
                            value={selectedDate1}
                            onChange={handleDateChange1}
                            KeyboardButtonProps={{
                            "aria-label": "change date",
                            }}
                            name="day_final"
                        />
                      </MuiPickersUtilsProvider>  
                </Grid>
            </Grid>
            <Grid container className={classes.containerfield} >
                <Grid item xs={12} sm={6} md={6} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                        <KeyboardTimePicker
                            style={{width:'95%'}}
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            margin="normal"
                            label="Hora de ingreso"
                            value={selectedDate2}
                            onChange={handleDateChange2}
                            KeyboardButtonProps={{
                            "aria-label": "change date",
                            }}
                        />
                      </MuiPickersUtilsProvider>  
                </Grid>
                <Grid item xs={12} sm={6} md={6} style={{display:'flex',justifyContent:'flex-end'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                        <KeyboardTimePicker
                            style={{width:'95%'}}
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            margin="normal"
                            label="Hora de salida"
                            value={selectedDate3}
                            onChange={handleDateChange3}
                            KeyboardButtonProps={{
                            "aria-label": "change date",
                            }}
                        />
                      </MuiPickersUtilsProvider>  
                </Grid>
            </Grid>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Button variant="contained" color="primary" onClick={handleEnvio} className={classes.btncontinuar}>Continuar</Button>
            </div>
        </div>
    )
}

export default SteepOne
