import React from 'react'

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const Reportes = () => {

    const [data, setdata] = React.useState({
        datos :[]
    })        
    const [info,setInfo] = React.useState({
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

        console.log(e.target.value)
        firebase.database().ref('/obras').child(e.target.value).once('value',function(snapshot){
            console.log('entra')
            snapshot.forEach(
                function(ChildSnapshot){
                    let numberdoc = ChildSnapshot.val().asistencia
                    let name = ChildSnapshot.val().name
                    let objeto ={
                        numberdoc,
                        name
                    }
                    console.log(numberdoc)
                   
                }
            )
        })
    }



    React.useEffect(() => {
        firebase.database().ref('/obras').once('value',function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                    let numberdoc = ChildSnapshot.val().id
                    let name = ChildSnapshot.val().name
                    let asistencia = ChildSnapshot.val().asistencia
                    let objeto ={
                        numberdoc,
                        name,
                        asistencia
                    }
                    console.log(numberdoc)
                    console.log(asistencia)
                    array.push(objeto)
                    // console.log(array)
                    addArray(array)
                }
            )
        })
    }, [])

    return (
        <div style={{maxWidth:900,margin:'auto'}}>
                <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel id="demo-simple-select-outlined-label">
                            Encargado de Asistencia
                        </InputLabel>
                        <Select
                            value={info.dniris}
                            onChange={handleChange}
                            label="Encargado de Asistencia"
                            name="dniris"
                        >
                            <MenuItem value="">
                            <em>Escoger encargado</em>
                            </MenuItem>
                            {
                               data.datos.map((item,index) => {
                                return(
                                    <MenuItem value={item.numberdoc} key={index} >{item.name}</MenuItem>
                                )
                               }) 
                            }
                        </Select>
                    </FormControl>
        </div>
    )
}

export default Reportes
