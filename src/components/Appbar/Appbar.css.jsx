import { makeStyles } from "@material-ui/core";


export const useStylesAppbar = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "flex",
      alignItemsc: "center",
    },
    appbar: {
      width: `calc(100%-${240}px)`,
      height:'80px',
      display:'flex',
      justifyContent:'center',
      borderRadius:'0px 0px 30px 30px',
      fontFamily: "'Boogaloo', 'Helvetica', 'Arial',cursive",
      marginBottom:40
    },
    banner_title:{
        width:'186px',
        // height:'100px',
        // border:'1px solid red',
        display:'block',
        // narginLeft:'10px',
        // margin:'5px 0px'
        },
        logo_title:{
            color:'#000000',
            fontWeight:'100',
            fontSize:'18px',
            "&:first-letter":{
                color:'#000000',
                fontWeight:'900',
                fontSize:'24px'
            }
        },
  }));