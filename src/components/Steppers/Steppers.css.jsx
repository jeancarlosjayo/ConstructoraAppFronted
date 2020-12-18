
import { makeStyles } from '@material-ui/core/styles';

export const useStylesSteppers = makeStyles((theme) => ({
    root: {
      width: '100%',
      
    },
    steep:{
        "& .MuiStepIcon-root.MuiStepIcon-active":{
          color:'#0237a0'
        },
        "& .MuiStepIcon-text":{
          fill: '#ffffff'
        },
        "& .MuiStepIcon-root":{
          color: ''
        },
        "& .MuiStepIcon-root.MuiStepIcon-completed":{
          color: theme.palette.primary.main
        },
        "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel":{
          fontWeight: '700'
        },
        // "& .makeStyles-steep-23 .MuiStepLabel-label.MuiStepLabel-alternativeLabel":{
        //     fontWeight: '700'
        // }
  
    },
    pregunta:{
        textAlign:'center',
        color:'#012241'
    },
    
  }));
  