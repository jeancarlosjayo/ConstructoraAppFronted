import { Typography } from '@material-ui/core'
import React from 'react'
import FormWorker from '../components/FormWorker/FormWorker'

const Worker = () => {
    return (
        <div style={{maxWidth:900,margin:'auto'}}>
            <Typography variant="h3" style={{margin:'20px'}}>Nuevo Obrero</Typography>
            <FormWorker></FormWorker>
        </div>
    )
}

export default Worker
