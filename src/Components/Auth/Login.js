import React, { Component } from "react";
import { login } from "../../Redux/userReducer.js";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Auth.css";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginUser = () => {
    let { username, password } = this.state;
    this.props.login(username, password);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.loginUser();
    }
  };

  render() {
    let { user } = this.props;
    if (user.loggedIn) return <Redirect to="/dashboard" />;
    return (
      <div className="auth-master">
        <div className="auth-container">
          <div className="icon">
            <i className="fas fa-comment-medical" />
          </div>
          <h1 className="auth-title">Sick Together</h1>
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
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="auth-buttons">
            <button className="dark-button" onClick={this.loginUser}>
              Login
            </button>
            <button className="dark-button">
              <Link to="/register">Register</Link>
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
  { login }
)(Login);
