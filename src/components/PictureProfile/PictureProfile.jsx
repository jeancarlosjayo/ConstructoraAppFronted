import { Avatar, Badge, Button, Typography } from '@material-ui/core'
import React from 'react'
import { userContext } from '../../context/userContext'
import { useStylesPictureProfile } from './PictureProfile.css'
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const PictureProfile = () => {

    const classes= useStylesPictureProfile()

    const {userinit} = React.useContext(userContext)

    const { name, profilepic } = userinit;

    return (

        <div className={classes.container}>
            <Badge
                overlap="circle"
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                badgeContent={<Button className={classes.buttonPicture}><CameraAltIcon color="secondary"/></Button>}
            >
                <Avatar alt={name} src={profilepic ? profilepic  : ''} style={{width:'180px',height:'180px'}}/>
            </Badge>
            <br></br>
            <div style={{textAlign:'center'}}>
            <Typography variant="h3">{name}</Typography>
            <Typography style={{fontSize:'16px'}}>Super administrador de la empresa Pisco tecnology</Typography>
            </div>
            
        </div>
    )
}

export default PictureProfile
