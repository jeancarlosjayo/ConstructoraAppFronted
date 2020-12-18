import{ makeStyles } from '@material-ui/core'


export const useStylesButtonPrimary = makeStyles((theme) => ({
    button_primary:{
        background: 'linear-gradient(90deg, #01298F 0.55%, #0261D0 105.48%), #0679FF',
        textTransform : 'initial' ,
        width:'220px',
        color:'white',
        height:'53px',
        borderRadius:'10px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    button_text:{
        fontSize:'24px',
        fontWeight:700,
        "&:first-letter":{
            color:'#fff',
            fontWeight:700,
            fontSize:'30px'
        }
    }
}))