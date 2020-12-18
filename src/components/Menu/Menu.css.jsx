

import { makeStyles } from '@material-ui/core/styles'

// const drawerWidth = 240;

export const useStylesMenu = makeStyles((theme) =>({
   menu:{
    background: 'linear-gradient(90deg, #01298F 0.55%, #0261D0 105.48%), #0679FF',
    height:'200%',
    // width:'340px'
    // minHeight:'10000%'
   },
   listicon:{
    margin:'5px',
    padding:'10px'
   },
   link:{
    outline:'none',
    textDecoration:'none',
    color:'inherit'
   },
   banner_title:{
    width:'206px',
    height:'100px',
    // border:'1px solid red',
    display:'block',
    // narginLeft:'200px',
    },
    logo_title:{
        color:'#fff',
        fontWeight:'100',
        fontSize:'24px',
        "&:first-letter":{
            color:'#fff',
            fontWeight:'900',
            fontSize:'36px'
        }
    },
}))