import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React from 'react'

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"
import TableWork from '../components/TableWork/TableWork';


const Work = () => {

    const [typeData,setTypeData] = React.useState("todos")

    const [dataWork,setDataWork] = React.useState([])

    const obtenerData = () => {
        console.log('dataa')
        if(typeData === 'activos'){
            firebase.database().ref('/obras').once('value',function(snapshot){
                const obras = Object.values(snapshot.val())
                const newData = obras.filter(item => item.state === 'activado')
                console.log(newData)
                setDataWork(newData)
            })
        }else if(typeData === 'registrados'){
            firebase.database().ref('/obras').once('value',function(snapshot){
                const obras = Object.values(snapshot.val())
                const newData = obras.filter(item => item.state === 'registrado')
                console.log(newData)
                setDataWork(newData)
            })
        }else{
            firebase.database().ref('/obras').once('value',function(snapshot){
                const obras = Object.values(snapshot.val())
                // const newData = obras.filter(item => item.state === 'registrado')
                console.log(obras)
                setDataWork(obras)
            })
        }
        

    }  

    const handleChange = (e) => {
        setTypeData(e.target.value)
    }

    React.useEffect(()=>{
        obtenerData() 
    },[typeData])

    console.log(typeData)

    return (
        <div style={{maxWidth:1200,margin:'auto'}}>
            <Typography variant="h3" style={{margin:'20px'}}>Obras</Typography>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel id="demo-simple-select-outlined-label">
                Estado  de Obra
              </InputLabel>
              <Select
                value={typeData}
                onChange={handleChange}
                label="Tipo de documento"
                name="category"
              >
                <MenuItem value="">
                  <em>Escoger categoria</em>
                </MenuItem>
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="activos">Solo activos</MenuItem>
                <MenuItem value="registrados">Solo registrados</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <br></br>
            <TableWork data={dataWork}></TableWork>
        </div>
    )
}

export default Work
