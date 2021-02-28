import { makeStyles } from "@material-ui/core";
import foto from "../../assets/img/fondoLogin.svg";

export const useStylesFooter = makeStyles((theme) => ({
    footer:{
        background:theme.palette.primary.main,
        position:'static',
        width:'100%',
        bottom:'0px',
        display:'flex',
        justifyContent:'space-between',
        height:'60px',
        alignItems:'center',
        color:'white',
        padding:'10px 30px',
        borderRadius:'30px 30px 0px 0px',
        margin:'60px 0px 0px 0px',
        [theme.breakpoints.up(1000)]: {
            margin:'113px 0px 0px 0px',
        },
    }
}));
