
import { createMuiTheme } from "@material-ui/core/styles";

const themeGlobal = createMuiTheme({
    palette:{
        primary:{
            main:'#0237a0'
        },
        secondary:{
            main:'#ffffff'
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
        fontFamily:"'Quantico', 'Helvetica', 'Arial', sans-serif"
        
    },
});

export default themeGlobal;