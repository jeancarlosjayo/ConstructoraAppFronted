import { Button, FormControl, InputLabel, MenuItem, Select, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"
import TableWork from '../components/TableWork/TableWork';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { Bar } from 'react-chartjs-2'

const useStyles = makeStyles((theme)=> ({
    button:{
        textTransform:'initial',
        background:'transparent',
        color: theme.palette.secondary.main,
        padding:'0px 10px'
    },
    buttonActive:{
        textTransform:'initial',
        background:'#FFFFFF',
        color:'#979797',
        borderRadius:30,
        width:90,
        "&:hover":{
            background:'#FFFFFF',
            color:'#979797',
        }
    }
}))

const Work = () => {

    const classes = useStyles()

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

    React.useEffect(()=>{
        obtenerData() 
    },[typeData])

    console.log(typeData)

    const printDocument =() => {  
        const input = document.getElementById('graphdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4',)  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save('intento');  
          });  
      }  

    return (
 
        <div style={{maxWidth:1240,margin:'auto',boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.24)',padding:'5px 20px'}}>
            
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Typography variant="h3">Listado de Obras : {dataWork.length}</Typography>
            <div style={{background:'#FBE5C9',height:45,width:300,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:30}}>
                <Button 
                className={ typeData === "todos" ? classes.buttonActive : classes.button }
                onClick={()=>setTypeData('todos')}
                >Todos</Button>
                <Button 
                className={ typeData === "activos" ? classes.buttonActive : classes.button }
                onClick={()=>setTypeData('activos')}
                >Activados</Button>
                <Button 
                className={ typeData === "registrados" ? classes.buttonActive : classes.button }
                onClick={()=>setTypeData('registrados')}
                >Registrados</Button>

            </div>
            </div>
          
                asdsadsadsadsad
            
            <button onClick={printDocument}>onlick</button>
            {/* <FormControl variant="outlined" fullWidth={true}>
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
            </FormControl> */}
            <br></br>
            {/* <br></br> */}
            
            <TableWork data={dataWork}></TableWork>
            <div id="graphdiv">
            {/* <h1>adsadsad</h1> */}
            <Bar
            height={400}
            width={600} 
            data={{
                labels: ['10/02', '10/05','10/02', '10/05'],
                datasets: [{
                    label: 'Obreros',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                }]
            }} >
            </Bar>
            </div>
        </div>
    )
}

export default Work
