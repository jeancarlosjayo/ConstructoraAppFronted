import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useStylesButtonPrimary } from './ButtonPrimary.css'

const ButtonPrimary = ({text, onClick}) => {

    const classes = useStylesButtonPrimary()

    return (
        <Button className={classes.button_primary} onClick={onClick}>
            <Typography className={classes.button_text}>{text}</Typography>
        </Button>
    )
}

export default ButtonPrimary
