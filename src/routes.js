import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Group from './Components/Group/Group'
import CreateGroup from './Components/CreateGroup/CreateGroup'
import EditGroup from './Components/EditGroup/EditGroup'
import AccountSettings from './Components/AccountSettings/AccountSettings'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/group/:groupid' component={Group} />
        <Route path='/creategroup' component={CreateGroup} />
        <Route path='/editgroup/:group_id' component={EditGroup} />
        <Route path='/accountsettings' component={AccountSettings} />
    </Switch>
)