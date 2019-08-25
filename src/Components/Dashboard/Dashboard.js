import React, { Component } from "react";
import "./Dashboard.css";
import { logout } from "../../Redux/userReducer.js";
import { getGroups } from "../../Redux/groupReducer.js";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Groups from "../Groups/Groups";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getGroups();
  }
  render() {
    let { user } = this.props.user;
    if (!user.loggedIn) return <Redirect to="/" />;
    return (
      <div className="Dash">
        <Groups />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    groups: state.groups
  };
}
export default connect(
  mapStateToProps,
  { logout, getGroups }
)(Dashboard);
