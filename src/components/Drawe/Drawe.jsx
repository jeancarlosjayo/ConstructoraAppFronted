import { Drawer } from '@material-ui/core'
import React from 'react'
import Menu from '../../components/Menu/Menu'
import { useStylesDrawe } from './Drawe.css'



const Drawe = (props) => {
    const classes = useStylesDrawe()
    const {open , setOpen} = props
    const handleOpen = () =>{
        setOpen(false)
    }
    return (
        <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClick={handleOpen}
        >
          <Menu setOpen={setOpen} ></Menu>
        </Drawer>
    )
}

export default Drawe
