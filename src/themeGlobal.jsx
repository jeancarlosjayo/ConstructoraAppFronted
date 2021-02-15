
import { createMuiTheme } from "@material-ui/core/styles";

const themeGlobal = createMuiTheme({
    palette:{
        primary:{
            main:'#122555'
        },
        secondary:{
            main:'#F57E21'
        },
        background:{
            paper:'#ffffff',
            default:'#ffffff',
        },
        action:{
            activatedOpacity:1,
            focusOpacity: 1,
            selectedOpacity: 1

        }
    },
    mixins:{
        toolbar:{
            minHeight:0,
            
        }
    },
    typography:{
        // fontFamily:"'Quantico', 'Helvetica', 'Arial', sans-serif",
        // fontFamily: "'Boogaloo', cursive",
        fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
        h3:{
             fontFamily: "'Boogaloo', cursive",
        },
        h5:{
            fontFamily: "'Boogaloo', cursive",
       }

    },
});

export default themeGlobal;