import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const AdminRoute = ({
    isAuth,
    component : Component,
    ...rest

}) => {
    return (
        <Route
        {...rest}
        component={
            (props) =>(
                (isAuth)
                ?
                (<Component {...props}></Component>)
                :
                (<Redirect to="/login"></Redirect>)

            )

        }
        
        >

        </Route>
    )
}

export default AdminRoute