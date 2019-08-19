import React, { Component } from "react";
import { signup } from "../../Redux/userReducer.js";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Auth.css";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      city: "",
      state: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(name, value);
  };

  signupUser = () => {
    let { username, password, city, state } = this.state;
    let profilePic = `https://robohash.org/${this.state.username}`;
    this.props.signup(username, password, profilePic, city, state);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.signupUser();
    }
  };

  render() {
    let { user } = this.props;
    if (user.loggedIn) return <Redirect to="/dashboard" />;
    return (
      <div className="auth-master">
        <div className="auth-container">
          <div className="icon">
            <i className="fas fa-user-plus" />
          </div>
          <h1 class="auth-title">Sick Together</h1>
          <div className="auth-input-div">
            <p>Username</p>
            <input type="text" name="username" onChange={this.handleChange} />
          </div>
          <div className="auth-input-div">
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="auth-input-div">
            <p>City:</p>
            <input type="text" name="city" onChange={this.handleChange} />
          </div>
          <div className="auth-input-div">
            <p>State:</p>
            <input
              type="text"
              name="state"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="auth-buttons">
            <button className="dark-button">
              <Link to="/">Login</Link>
            </button>
            <button className="dark-button" onClick={this.signupUser}>
              Register
            </button>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}
export default connect(
  mapStateToProps,
  { signup }
)(Register);
