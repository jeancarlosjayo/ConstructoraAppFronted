import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const LoginRoute = ({
    isAuth,
    component : Component,
    ...rest

}) => {
    return (
        <Route
        {...rest}
        component={
            (props) =>(
                (!isAuth)
                ?
                (<Component {...props}></Component>)
                :
                (<Redirect to="/"></Redirect>)

            )

        }
        
        >

        </Route>
    )
}

export default LoginRoute
