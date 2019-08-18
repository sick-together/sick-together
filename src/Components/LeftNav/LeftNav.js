import React, { Component } from 'react'
import './LeftNav.css'
import { connect } from 'react-redux'
import { logout, getUser } from '../../Redux/userReducer.js';
import { withRouter } from 'react-router-dom'

export class LeftNav extends Component {

    componentDidMount = () => {
        this.props.getUser()
        console.log('Got User!')
    }
    render() {
        let { username, profilePic } = this.props
        let navClasses = 'nav-container'
        if (this.props.show) {
            navClasses = 'nav-container open'
        }
        if (this.props.location.pathname === '/' || this.props.location.pathname === '/register') {
            return null
        } else
            return (

                <div className={navClasses}>

                    {/* <div>
                        <i className="fas fa-bars" />
                    </div> */}
                    <div className='nav-profile-details'>
                        <img className='nav-profile-details-img' src={profilePic} alt='Profile Pic' />
                        <div><p>{username}</p></div>

                    </div>
                    <div className='home-and-post-links'>
                        <a href='#/dashboard'><i className="fas fa-clinic-medical" /></a>
                    </div>
                    <a className='logout' href="#/" onClick={this.props.logout}><i className="fas fa-power-off" /></a>

                </div>
            )
    }
}
function mapStateToProps(state) {
    return state.user;
}

export default connect(mapStateToProps, { logout, getUser })(withRouter(LeftNav))
