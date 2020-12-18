import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../views/Home'

const admin = () => {
    return (
            <div>
                
                <Switch>
                    <Route exact path="/asd" component={Home}></Route>
                    <Redirect to="/asd"></Redirect>
                </Switch>
            {/* // sadsadsadsadasdasd */}
            </div>
    )
}

export default admin
