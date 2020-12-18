import { Typography } from '@material-ui/core'
import React from 'react'
import Steppers from '../components/Steppers/Steppers'


const Home = () => {

    return (
        <div style={{maxWidth:900,margin:'auto'}}>
            <Typography variant="h3" style={{margin:'20px'}}>Nueva Obra</Typography>
            <Steppers></Steppers>
        </div>
    )
}

export default Home
