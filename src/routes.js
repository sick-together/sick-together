import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Group from './Components/Group/Group'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/group/:groupid' component={Group} />

    </Switch>
)