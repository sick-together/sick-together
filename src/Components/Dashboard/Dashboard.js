import React, { Component } from 'react'
import './Dashboard.css'
import { logout } from '../../Redux/userReducer.js';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'


export class Dashboard extends Component {
    render() {
        let { user } = this.props;
        if (!user.loggedIn) return <Redirect to="/" />;
        return (
            <div className='Dash'>
                <h1>Home</h1>
                <button onClick={this.props.logout}><Link to='/'>Logout</Link></button>
            </div>
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

