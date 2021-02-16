import React from 'react'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"
import { fechaDehoy, fechaTimeStamp } from '../helpers/Fechas';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { Bar } from 'react-chartjs-2'

const ObraExcel = () => {

    let { id } = useParams();

    const obra = id.split('-')
    console.log(obra)

    const [ total, setTotal ] = React.useState(0)
    const [ asistieron, setAsistieron] = React.useState(0)
    const [ nombre, setNombre] = React.useState('')
    const [ fecha, setFecha ] = React.useState(fechaTimeStamp(new Date((parseInt(obra[1]))*1000)))

    React.useEffect(()=>{
        console.log('entra')
        firebase.database().ref('/obras/'+ obra[0]).once('value',function(snapshot){
            if(snapshot.exists()){     
                    const data = snapshot.val() 
                    console.log(data)
                    setTotal(data.buildersnum)  
                    setNombre(data.name)    
            }else{
                console.log('error')
                return null
            }
        })
        firebase.database().ref('/obras/'+ obra[0]).child('asistencia').child(obra[1]).once('value',function(snapshot){
            if(snapshot.exists()){     
                    const data = snapshot.val() 
                    console.log(data)  
                    const arrayExcel = getDatosLista(Object.values(data))
                    console.log(arrayExcel);
                    setAsistieron(arrayExcel.length)
                    exportToCSV(arrayExcel,`${}`)
                    printDocument()
                    setTimeout(() => {
                        window.open('', '_self', `${nombre}-${fecha}`);
                        window.close(); 
                    }, 3500);    
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
        exportData.sort(function (a, b) {
            if (a.NOMBRE > b.NOMBRE) {
              return 1;
            }
            if (a.NOMBRE < b.NOMBRE) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
        // console.log(exportData)
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
            pdf.save(`${nombre}-${fecha}`);  
          });  
      }  



    return (
        <>
        <div id="graphdiv" style={{maxWidth:'1000px',margin:'auto',padding:'20px'}}>
            <h1 style={{textAlign:'center'}}>Obra: {nombre}</h1>
            <h2 style={{textAlign:'center'}}>Fecha: {fecha}</h2>
            <br></br>
            <Bar
            height={400}
            width={900} 
            data={{
                labels: ['Asistieron', 'Se esperaba'],
                datasets: [{
                    data: [asistieron, total, 1, 5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                }],
            }}
            options={{
                legend :{
                    display:false
                }
            }}
             />
             <div style={{display:'flex',justifyContent:'space-around'}}>
                 <div style={{display:'flex',alignItems:'center'}}>
                     <div style={{background:'rgba(255, 99, 132, 0.2)',border:'1px solid rgba(255, 99, 132, 1)',height:'20px',width:'40px',marginRight:5}}></div>
                    <h3>ASISTIERON : {asistieron} Personas</h3>    
                 </div>
                 <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{background:'rgba(54, 162, 235, 0.2)',border:'1px solid rgba(54, 162, 235, 1)',height:'20px',width:'40px',marginRight:5}}></div>
                    <h3>SE ESPERABA : {total} Personas</h3>
                 </div>
             </div>
            
        </div>
        <h3 style={{textAlign:'center'}}>Descargando excel y pdf ...</h3>
        </>
    )
}

export default ObraExcel
