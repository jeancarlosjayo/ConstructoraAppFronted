import { Button, Dialog, Typography } from '@material-ui/core'
import React from 'react'
import FormCode from '../components/FormCode/FormCode'
import TableCode from '../components/TableCode/TableCode'

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"


const CodeExtension = () => {
    const [open,setOpen] = React.useState(false)
    const [extension, setExtension] = React.useState([])

    const obtenerData = () => {
        console.log('dataa')
        firebase.database().ref('/codes').child('extension').once('value',function(snapshot){
            const valores = Object.values(snapshot.val())
            setExtension(valores)
        })
    }   

    const handleOpen = () => setOpen(!open)

    React.useEffect(()=>{
        obtenerData()
    },[])
 

    return (

         <div style={{maxWidth:1200,margin:'auto'}}>
            <Typography variant="h3" style={{margin:'20px 0px'}}>Codigos de Extensión</Typography>
            <div style={{margin:'20px 0px'}}>
                <Typography variant="h5" style={{margin:'8px 0px'}}>Agregar nuevo código</Typography>
                <Button variant="contained" color="primary" onClick={handleOpen}>Agregar</Button>
            </div>
            <Dialog open={open} onClose={handleOpen}>
                <FormCode handleOpen={handleOpen} type="extension" obtenerData={obtenerData}/>
            </Dialog>
            <TableCode data={extension}/>
         </div>

    )
}

export default CodeExtension