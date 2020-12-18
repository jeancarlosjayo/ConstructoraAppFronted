import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'


import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"


const SteepThree = () => {


    const [data, setdata] = useState({
        datos :[]
    })

    const [info,setInfo] = useState({
        emailreport:'',
        dniris:''
    })

    const array = []

    const addArray = (array) =>{
        setdata({
            datos:array
        })
    }


    const handleChange = (e) =>{
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
      }




    useEffect(() => {
        firebase.database().ref('/RIS').once('value',function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                    let numberdoc = ChildSnapshot.val().id
                    let name = ChildSnapshot.val().name
                    // let lastname = ChildSnapshot.val().lastname
                    let objeto ={
                        numberdoc,
                        name,
                        // lastname
                    }
                    array.push(objeto)
                    console.log(array)
                    addArray(array)
                }
            )
        })
    }, [])

    const handleEnvio = () => {



    }

    console.log(info)


    return (
        <div>
            <Grid container >
                <Grid item xs={12} md={12} sm={12}>
                    <TextField
                    fullWidth={true}
                    type="email"
                    label="Correo electronico para reportes"
                    variant="outlined"
                    placeholder="Ingrese correo electronico"
                    onChange={handleChange}
                    name="emailreport"
                    value={info.emailreport}
                    autoComplete="off"
                    />
                </Grid>
            </Grid>
            <br></br>
            <Grid container >
                <Grid item xs={12} md={12} sm={12}>
                    <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel id="demo-simple-select-outlined-label">
                            Tipo de documento
                        </InputLabel>
                        <Select
                            value={info.dniris}
                            onChange={handleChange}
                            label="Tipo de documento"
                            name="dniris"
                        >
                            <MenuItem value="">
                            <em>Escoger tipo de documento</em>
                            </MenuItem>
                            {
                               data.datos.map((item,index) => {
                                return(
                                    <MenuItem value={item.numberdoc} key={index}>{item.name}</MenuItem>
                                )
                               }) 
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <br></br>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Button variant="contained" color="primary" 
                onClick={handleEnvio} 
                // className={classes.btncontinuar}
                >Continuar</Button>
            </div>
        </div>
    )
}

export default SteepThree
