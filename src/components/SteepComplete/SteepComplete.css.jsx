import{ makeStyles } from '@material-ui/core'


export const useStylesSteepComplete = makeStyles((theme) => ({

    container:{
        borderRadius:'10px',
        padding:'15px',
        boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)',
        width:'700px',
        maxWidth:1000,
        margin:'auto'
        
    },
    title:{
        color:'black',
        fontWeight:700,
        fontSize:'36px',
        margin:'10px 0px',
        padding:'0px 20px'
    },
    grid:{
     
        fontSize:'20px',
        maxWidth:600,
        margin:'auto',
        padding:'10px 0'
    },
    griditem:{
        textAlign:'center'
    },
    griditembtn:{
        display:'flex',
        justifyContent:'center'
    }

}))