import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { createGroup, getGroups } from "../../Redux/groupReducer";

export class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      group_name: "",
      group_picture: "",
      description: ""
    };
  }

  componentDidMount() {
    this.props.getGroups()
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(name, value)
  };

  handleSubmit = () => {
    let { group_name, group_picture, description } = this.state;
    this.props.createGroup(group_name, group_picture, description)
    this.setState({
      group_name: "",
      group_picture: "",
      description: ""
    });

  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <TextField
          name="group_name"
          label="Group Name"
          onChange={this.handleChange}
        />
        <TextField
          name="group_picture"
          label="Group Picture"
          onChange={this.handleChange}
        />
        <TextField
          name="description"
          label="Description"
          onChange={this.handleChange}
        />
        <Link to="/">
          {" "}
          <Button onClick={this.handleSubmit} variant="contained">
            Submit
          </Button>{" "}
        </Link>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.user, ...state.groups };
}

export default connect(
  mapStateToProps,
  { createGroup, getGroups }
)(CreateGroup);
