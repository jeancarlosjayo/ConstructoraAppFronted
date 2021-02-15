import React from 'react'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"
import { fechaDehoy, fechaTimeStamp } from '../helpers/Fechas';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ObraExcel = () => {

    let { id } = useParams();

    const [ data, setData ] = React.useState([])

    const obra = id.split('-')
    console.log(obra)


    React.useEffect(()=>{
        firebase.database().ref('/obras/'+ obra[0]).child('asistencia').child(obra[1]).once('value',function(snapshot){
            if(snapshot.exists()){     
                    const data = snapshot.val() 
                    console.log(data)  
                    const arrayExcel = getDatosLista(Object.values(data))
                    console.log(arrayExcel);
                    exportToCSV(arrayExcel,'intento')
                    setTimeout(() => {
                        window.open('', '_self', '');
                        window.close(); 
                    }, 1000);
                    
                    
            }else{
                console.log('error')
    
                return null
            }
    
        })
    },[])


    const getDatosLista = (data) => { 
        console.log(data);
        let exportData = [];
        data.forEach(l => {
          let object = { "NOMBRE" :  l.names, "DNI" : l.dni
          , "HORA DE INGRESO" : l.timeenter === '' ? 'SIN ASIGNAR ' : l.timeenter
          ,  "HORA DE SALIDA" : l.timeexit === '' ? 'SIN ASGINAR' : l.timeexit
          , "CATEGORIA": l.category === '' ? 'SIN ASGINAR' : l.category
          , "OCUPACION": l.charge === '' ? 'SIN ASGINAR' : l.charge
          , "PLANILLA" : l.playroll === '' ? 'SIN ASGINAR' : l.playroll
          , "FECHA DE NACIMIENTO" : l.dayborn === '' ? 'SIN ASGINAR' : l.dayborn
          , "FECHA DE VENCIMIENTO DE DNI" : l.expirationdatedni === '' ? 'SIN ASGINAR' : l.expirationdatedni
          , "EMPRESA" : l.enterprise === '' ? 'SIN ASGINAR' : l.enterprise
          , "RUC" : l.enterpriseruc === '' ? 'SIN ASGINAR' : l.enterpriseruc

          };
          exportData.push(object);
          
        });
        /////orden alfabetico////
        return exportData; 
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array', });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }


    return (
        <div>
            <h1>Descargando excel .....</h1>
        </div>
    )
}

export default ObraExcel
