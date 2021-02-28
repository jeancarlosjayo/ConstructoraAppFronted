import { Typography } from '@material-ui/core'
import React from 'react'
import logoFb from "../../assets/img/logoFb.svg";
import logoInsta from "../../assets/img/logoInsta.svg";
import logoLinkedin from "../../assets/img/logoLink.svg";
import logoYt from "../../assets/img/logoYt.svg";
import { useStylesFooter } from './Footer.css';

const Footer = () => {

    const classes = useStylesFooter()

    return (
        <div className={classes.footer}>
                  <div>
            <img src={logoFb} alt="logoFb" style={{ margin: "0px 8px" }}></img>
            <img
              src={logoInsta}
              alt="logoInsta"
              style={{ margin: "0px 8px" }}
            ></img>
            <img
              src={logoLinkedin}
              alt="logoLinkedin"
              style={{ margin: "0px 8px" }}
            ></img>
            <img src={logoYt} alt="logoYt" style={{ margin: "0px 8px" }}></img>
          </div>
            <div style={{textAlign:'end', fontWeight:300}}>
                <Typography>© 2020 Pisco tecnology</Typography>
                <Typography>Todos los derechos reservados</Typography>
            </div>
        </div>
    )
}

export default Footer
