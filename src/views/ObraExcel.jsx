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
                    const arrayExcel = getDatosLista(Object.values(data))
                    console.log(arrayExcel);
                    exportToCSV(arrayExcel,'gaaaa')
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

    console.log(data)


    const getDatosLista = (data) => { 
        console.log(data);
        let exportData = [];
        data.forEach(l => {
          let object = { "NOMBRE" :  l.names, "DNI" : l.dni
          , "HORA DE INGRESO" : l.timeenter === '' ? 'SIN ASIGNAR ' : l.timeenter
          ,  "HORA DE SALIDA" : l.timeexit === '' ? 'SIN ASGINAR' : l.timeexit
          };
          exportData.push(object);

        });

        return exportData;
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
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
