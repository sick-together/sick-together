import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header'
import LeftNav from './Components/LeftNav/LeftNav'
import routes from './routes'

class App extends Component {
  constructor() {
    super()
    this.state = {
      leftNavOpen: false
    }

  }

  leftNavClickHandler = () => {
    let { leftNavOpen } = this.state
    this.setState({ leftNavOpen: !leftNavOpen })
  }

  render() {
    return (
      <div className="App" >
        <Header leftNavClickHandler={this.leftNavClickHandler} />
        <LeftNav show={this.state.leftNavOpen} drawerClickHandler={this.leftNavClickHandler} />
        {routes}
      </div>
    );
  }
}

export default App;
