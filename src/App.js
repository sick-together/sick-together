import React, { Component } from 'react';
import './App.css';
import 'react-tenor/dist/styles.css'
import Header from './Components/Header/Header'
import LeftNav from './Components/LeftNav/LeftNav'
import { connect } from 'react-redux'
import { getUser } from './Redux/userReducer.js';
import routes from './routes'
import firebase from 'firebase'
import config from './config/firebaseConfig'

firebase.initializeApp(config)

class App extends Component {
  constructor() {
    super()
    this.state = {
      leftNavOpen: false
    }

  }
  componentDidMount = () => {
    this.props.getUser()
  }

  leftNavClickHandler = () => {
    let { leftNavOpen } = this.state
    this.setState({ leftNavOpen: !leftNavOpen })
  }

  render() {
    let { user } = this.props
    if (user) {
      console.log(user)
    }
    return (
      <div className="App" >
        {user && user.loggedIn ? (<header><Header leftNavClickHandler={this.leftNavClickHandler} />
          <LeftNav show={this.state.leftNavOpen} drawerClickHandler={this.leftNavClickHandler} /></header>) : null}

        {routes}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state.user;
}
export default connect(mapStateToProps, { getUser })(App)
