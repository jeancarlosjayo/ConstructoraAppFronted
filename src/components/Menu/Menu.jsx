import { CssBaseline, Divider, List, ListItem, ListItemIcon, Typography } from '@material-ui/core'
import React , { useContext }from 'react'
import PostAddIcon from '@material-ui/icons/PostAdd';
import BuildIcon from '@material-ui/icons/Build';
import CloseIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';
import { Link } from 'react-router-dom';
import { useStylesMenu } from './Menu.css';
import { userContext } from '../../context/userContext';



const Menu = ( props) => {
    
    const classes = useStylesMenu()

    const {userinit} = useContext(userContext)

    const { type } = userinit
    
    const {setOpen} = props

    const handleClose = () =>{
        setOpen(false)
    }



    return (
      <>
        <CssBaseline></CssBaseline>
        <List
          component="nav"
          aria-label="main mailbox folders"
          color="secondary"
          className={classes.menu}
        >
          <ListItem button onClick={handleClose} style={{ display: "flex", justifyContent: "flex-end" }}>
              <CloseIcon
                // 
                color="secondary"
              ></CloseIcon>
          </ListItem>
          <ListItem>
            <ListItemIcon
              className={classes.listicon}
              style={{ marginLeft: "35px" }}
            >
              <div className={classes.banner_title}>
                <Typography className={classes.logo_title}>
                  Constructora
                </Typography>
                <Typography
                  className={classes.logo_title}
                  style={{ textAlign: "end" }}
                >
                  Futuro
                </Typography>
              </div>
            </ListItemIcon>
          </ListItem>

          <Divider style={{ backgroundColor: "white" }}></Divider>
          {
            type === "admin"&&
            (
            <>
            <Link to="/registrar-obra" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.listicon}>
                <BuildIcon
                  style={{ marginRight: "3px" }}
                  color="secondary"
                ></BuildIcon>
              </ListItemIcon>
              <Typography variant="h6" color="secondary">
                Registar Obras
              </Typography>
            </ListItem>
          </Link>

          <Link to="/reportes" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.listicon}>
                <PostAddIcon
                  style={{ marginRight: "3px" }}
                  color="secondary"
                ></PostAddIcon>
              </ListItemIcon>
              <Typography variant="h6" color="secondary">
                Generar Reportes
              </Typography>
            </ListItem>
          </Link>

          <Link to="/obreros" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.listicon}>
                <GroupIcon
                  style={{ marginRight: "3px" }}
                  color="secondary"
                ></GroupIcon>
              </ListItemIcon>
              <Typography variant="h6" color="secondary">
                Registrar obreros
              </Typography>
            </ListItem>
          </Link>
          </>
            )
          }

{
            type === "ris"&&
            (
            <>
            <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.listicon}>
                <BuildIcon
                  style={{ marginRight: "3px" }}
                  color="secondary"
                ></BuildIcon>
              </ListItemIcon>
              <Typography variant="h6" color="secondary">
                Registar Asistencia
              </Typography>
            </ListItem>
          </Link>
          </>
            )
          }


          
        </List>
      </>
    );
}

export default Menu
