import { Typography } from '@material-ui/core'
import React from 'react'
import Steppers from '../components/Steppers/Steppers'
import XLSX from 'xlsx'
import { toStringDate } from '../helpers/textDate'
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

const Home = () => {

    const [file, setFile] = React.useState(null)

    const onChange = (e) => {
        setFile(e.target.files[0])
    }

    const [json,setJSON] = React.useState({})

    const JSON = () => {
        // XLSX.utils.json_to_sheet(data, 'out.xlsx');
        if(file){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              console.log(rowObject);
              setJSON(rowObject)
            //   document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
         });
        }
    }
    }

    console.log(file)

    const cambiarname = () => {
        console.log('sadsad',json);
        let newjson
        for( const item of json){
            const fecha = item['FECHA NACIMIENTO'] ? toStringDate(new Date((item['FECHA NACIMIENTO'] - (25567 + 1))*86400*1000)): ''
            const fechapuesto = item['FECHA INICIO PUESTO'] ? toStringDate(new Date((item['FECHA INICIO PUESTO'] - (25567 + 1))*86400*1000)): ''
            const dni = item['NRODOC'] ? item['NRODOC']: ''
            console.log(item['NRODOC'].toString() )
            newjson ={
                charge: item['CARGO'] ? item['CARGO'] : '',
                category: item['CATEGORIA'] ? item['CATEGORIA'] : '',
                datestart: fechapuesto,
                dayborn:fecha,
                names:item['NOMBRES'] ? item['NOMBRES'] : '',
                lastnamefirst: item['PRIMER APELLIDO'] ? item['PRIMER APELLIDO'] : '',
                lastnamesecond: item['SEGUNDO APELLIDO'] ? item['SEGUNDO APELLIDO'] : '',
                typedoc:item['TIPODOC'] ? item['TIPODOC'] : '',
                nrodoc:item['NRODOC'] ? item['NRODOC'] : '',
                buildid:'1610987210'
            }
            firebase.database().ref('/obreros/' + dni).set(newjson).then(res => {
                console.log(res)
            }).catch(ex => {
                console.log(ex)
            })
        }
        
    }

    console.log('json',json)



    return (
        <div style={{maxWidth:900,margin:'auto'}}>
            <Typography variant="h3" style={{margin:'20px'}}>Nueva Obra</Typography>
            <Steppers></Steppers>
            <input type="file" id="input" accept=".xls,.xlsx" onChange={onChange}></input>
            <button onClick={JSON}>JSON</button>
            <button onClick={cambiarname}>ENVIAR</button>
        </div>
    )
}

export default Home
