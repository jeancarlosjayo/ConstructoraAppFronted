import React from 'react'
import { useStylesBannerProfile } from './BannerProfile.css'

const BannerProfile = () => {

    const classes = useStylesBannerProfile()

    return (
        <div className={classes.banner}>
            
        </div>
    )
}

export default BannerProfile
