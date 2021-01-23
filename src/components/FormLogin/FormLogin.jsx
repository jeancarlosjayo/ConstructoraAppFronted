import { Grid, TextField, Typography } from '@material-ui/core'
import React , { useState, useContext } from 'react'
import { userContext } from '../../context/userContext'
import { LoginwithFirebase, UserType } from '../../firebase/firebase.config'
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary'
import { useStylesFormLogin } from './FormLogin.css'

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

import { ADD_OTHERDATOS_USER, ADD_UID_USER, LOGIN_USER,LOGOUT_USER } from '../../types/userTypes';

const FormLogin = () => {

    const classes = useStylesFormLogin()

    const [login, setLogin] = useState({
        email:'',
        password:''
    }) 
    const { email , password } = login
    
    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }

    const { dispatch } = useContext(userContext)

    const LoginwithFirebase = (email,password) => {

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            const uid = user.user.uid
            console.log('user',uid);
            dispatch({
                type:ADD_UID_USER,
                payload: uid
            })
            UserType(uid)
            
        })
        .catch((error) => {
            console.log('error',error);
           
        });
    
        
        }
    
        const UserType = (uid) => {
    
            // let data
            // var starCountRef = firebase.database().ref('/users/' + uid);
            // starCountRef.on('value', (snapshot) =>{
            // data = snapshot.val();
            //     console.log(data)
            //     return data        
            // });
            firebase.database().ref('/users/'+ uid).once('value')
            .then((snapshot) => {
                const type = (snapshot.val() && snapshot.val().type) ;
                const name = (snapshot.val() && snapshot.val().name) ;
                const email = (snapshot.val() && snapshot.val().email) ;
                console.log('tipo usser',type)
                dispatch({
                    type:ADD_OTHERDATOS_USER,
                    payload:{
                        type,
                        name,
                        email
                    }
                })
                dispatch({
                    type:LOGIN_USER,
                    payload: true
                })
                
            })
            .catch((error)=>{
                console.log(error)
                
            })
    
    
        }
    

    const handleLogin =  () => {
        LoginwithFirebase( email , password) 
    }

    
    

    return (
        <div style={{margin:'30px'}}>
        <Grid  container className={classes.container_login}>
            <Grid item className={classes.banner_login} md={6} sm={6}>
                <div className={classes.banner_title}>
                    <Typography className={classes.logo_title}>Constructora</Typography>
                    <Typography 
                    className={classes.logo_title}
                    style={{textAlign:'end'}}>Futuro</Typography>
                </div>
            </Grid>
            <Grid item md={6} sm={6} className={classes.form_login}>

                    <div className={classes.form_title} >
                        <Typography className={classes.form_text_title}>Bienvenido</Typography>
                        <Typography style={{fontSize:'36px'}}>a tu </Typography>
                        <Typography className={classes.form_text_title}>Administrador</Typography>

                    </div>
                    <br></br>
                    <TextField
                    type="email"
                    label="Correo Electrónico"
                    variant="outlined"
                    placeholder="Ingrese correo electrónico"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    // autoComplete="off"
                    />
                    <br></br>
                    <TextField
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    placeholder="Ingrese contraseña"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    autoComplete="off"
                    />
                    <br></br>
                    <ButtonPrimary text="Ingresar" onClick={handleLogin}/>
            </Grid>
        </Grid>
        </div>

    )
}

export default FormLogin
