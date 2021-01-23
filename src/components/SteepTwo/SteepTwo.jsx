import React , { useState, useEffect, useContext }from 'react'

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';

import { useStylesSteppTwo } from './SteepTwo.css'
import { workContext } from '../../context/workContext';
import { STEPTWO_WORK } from '../../types/workTypes';

const SteepTwo = ({handleNext}) => {

    const classes = useStylesSteppTwo()

    const [data, setdata] = useState({
        datos :[]
    })

    const [workers, setworkers] = useState({
        obreros:[],
        obrerosname:[]
    })

    const array = []

    const {dispatchwork} = useContext(workContext)


    const addArray = (array) =>{
        setdata({
            datos:array
        })
    }

    const getValue = (e) =>{
        console.log(e.target.value)
        const exist = workers.obreros.some(item => item === e.target.value)
        const existname = workers.obrerosname.some(item => item === e.target.name)

        if(exist && existname){
            const filter = workers.obreros.filter(item => item !== e.target.value)
            const filtername = workers.obrerosname.filter(item => item !== e.target.name)
            setworkers({
                ...workers,
                obreros:filter,
                obrerosname:filtername
            })

        }else{
            setworkers({
                ...workers,
                obreros:[...workers.obreros,e.target.value],
                obrerosname:[...workers.obrerosname,e.target.name]

            })
        }             
    }

    console.log(workers) 

    const handleEnvio = async () =>{

        await dispatchwork({
            type: STEPTWO_WORK,
            payload:{
                workers: workers.obreros,
                workersname: workers.obrerosname,
                totalworkers: workers.obreros.length
            }
        })
        handleNext()

    }

    useEffect(() => {
        firebase.database().ref('/obreros').once('value',function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                    let numberdoc = ChildSnapshot.val().dni
                    let name = ChildSnapshot.val().name
                    let lastname = ChildSnapshot.val().lastname
                    let objeto ={
                        numberdoc,
                        name,
                        lastname
                    }
                    array.push(objeto)
                    console.log(array)
                    addArray(array)
                }
            )
        })
    }, [])


    console.log(data.datos)
    return (
        <div>
            <Typography variant="h5" color="initial">Lista de obreros</Typography>
            {
               data.datos.map((item,index) => {
                   return (
                    <div style={{display:'flex',alignItems:'center'}} key={index}>
                    <Checkbox 
                    color="primary" 
                    value={item.numberdoc}
                    name={`${item.name} ${item.lastname}`}
                    onChange={(e)=>getValue(e)}></Checkbox>
                    <Typography variant="body2" color="initial">{item.name} {item.lastname}</Typography>
                    </div>
                   )
               }) 
            }
             <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Button variant="contained" color="primary" onClick={handleEnvio} className={classes.btncontinuar}>Continuar</Button>
            </div>
        </div>
    )
}

export default SteepTwo
