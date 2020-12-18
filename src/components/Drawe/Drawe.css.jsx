import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240;

export const useStylesDrawe = makeStyles((theme) =>({
    drawer: {
        width: 100,
        flexShrink: 0,
        backgroundColor:theme.palette.background.paper,
      },
      drawerPaper: {
        width: drawerWidth,
      }
}))