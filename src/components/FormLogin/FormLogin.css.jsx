import{ makeStyles } from '@material-ui/core'

export const useStylesFormLogin = makeStyles((theme) => ({
    container_login:{
        // border:'1px solid red',
        maxWidth:1000,
        width:'800px',
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        margin:'auto',
        height:'600px',
        background: '#FFFFFF',
        boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px'
    },
    banner_login:{
        background:'linear-gradient(90deg, #01298F 0.55%, #0261D0 105.48%), #0679FF',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'20px 0px 0px 20px'
    },
    banner_title:{
        width:'306px',
        // border:'1px solid red'
    },
    logo_title:{
        color:'#fff',
        fontWeight:'100',
        fontSize:'36px',
        "&:first-letter":{
            color:'#fff',
            fontWeight:'900',
            fontSize:'48px'
        }
    },
    form_login:{
        display:'flex',
        flexDirection:'column',
        alignItems :'center',
        justifyContent:'center',
        // border:'1px solid red'
    },
    form_title:{
        textAlign:'center',
        color:'black',

    },
    form_text_title:{
        fontSize:'36px',
        "&:first-letter":{
            color:'#black',
            fontWeight:'900',
            fontSize:'48px'
        }
    }
}))