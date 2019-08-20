import React, { Component } from 'react'
import './Dashboard.css'
import { logout } from '../../Redux/userReducer.js';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import Groups from '../Groups/Groups'


export class Dashboard extends Component {
    render() {
        let { user } = this.props;
        if (!user.loggedIn) return <Redirect to="/" />;
        return (
            <Groups />
        )
    }
}

function mapStateToProps(state) {
    return state.user;
}
export default connect(
    mapStateToProps,
    { logout }
)(Dashboard);

