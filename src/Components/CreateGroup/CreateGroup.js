import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { createGroup } from "../../Redux/groupReducer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    height: '75vh'
  },
  textFields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '90px'
  }
}));

function CreateGroup(props) {
  const [group_name, setGroupName] = React.useState("");
  const [group_picture, setGroupPicture] = React.useState("");
  const [description, setDescription] = React.useState("");
  const classes = useStyles();

  function handleSubmit() {
    let { id } = props.user;
    setGroupName("");
    setGroupPicture("");
    setDescription("");
    props.createGroup(group_name, id, group_picture, description);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
      className={classes.textFields}
        name="group_name"
        label="Group Name"
        value={group_name}
        onChange={e => setGroupName(e.target.value)}
      />
      <TextField 
        className={classes.textFields}
        name="group_picture"
        label="Group Picture"
        value={group_picture}
        onChange={e => setGroupPicture(e.target.value)}
      />
      <TextField
        className={classes.textFields}
        name="description"
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Link to="/">
        {" "}
        <Button className={classes.button} onClick={handleSubmit} variant="contained">
          Submit
        </Button>{" "}
      </Link>
    </form>
  );
}

function mapStateToProps(state) {
  return { ...state.user, ...state.groups };
}

export default connect(
  mapStateToProps,
  { createGroup }
)(CreateGroup);
