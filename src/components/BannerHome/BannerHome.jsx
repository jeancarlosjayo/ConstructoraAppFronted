import { Typography } from '@material-ui/core'
import React from 'react'
import { useStylesBannerHome } from './BannerHome.css'

const BannerHome = () => {

    const classes = useStylesBannerHome()

    return (
        <div className={classes.banner}>
            <Typography variant="h5" className={classes.title}>App constructora</Typography>
            <Typography className={classes.subtitle}>Desarrolamos un espacio gestionar  obras</Typography>
        </div>
    )
}

export default BannerHome
