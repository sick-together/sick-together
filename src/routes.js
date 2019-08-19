import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Dashboard from './Components/Dashboard/Dashboard'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />

    </Switch>
)