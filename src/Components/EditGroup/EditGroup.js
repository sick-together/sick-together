import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import { editGroup } from "../../Redux/groupReducer";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 182
  }
}));

function EditGroup(props) {
  const [newGroupName, setNewGroupName] = React.useState("");
  const [newGroupPicture, setNewGroupPicture] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [newCity, setNewCity] = React.useState("");
  const [newState, setNewStateUS] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { user, editId } = props
  const classes = useStyles();


  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }
  function handleChange(e) {
    setNewStateUS(e.target.value);
  }
  function handleSubmit() {
    let newLocation = `${newCity}, ${newState}`
    props.editGroup(newGroupName, newGroupPicture, newDescription, newLocation, editId);
    setNewGroupName("");
    setNewGroupPicture("");
    setNewDescription("");
    
    setNewCity("")
    setNewStateUS("")
    // props.editGroup(newGroupName, newGroupPicture, newDescription, newLocation);
    console.log('name', newGroupName, 'picture', newGroupPicture, 'desc', newDescription, 'loc', newLocation)
    // console.log('props', props);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {!user.loggedIn ? <Redirect to='/' /> : null}
      <TextField
        className={classes.textFields}
        name="new-group-name"
        label="New Group Name"
        value={newGroupName}
        onChange={e => setNewGroupName(e.target.value)}
      />
      <TextField
        className={classes.textFields}
        name="new-group-picture"
        label="New Group Picture"
        value={newGroupPicture}
        onChange={e => setNewGroupPicture(e.target.value)}
      />
      <TextField
        className={classes.textFields}
        name="new-description"
        label="newDescription"
        value={newDescription}
        onChange={e => setNewDescription(e.target.value)}
      />
     
        <TextField
          className={classes.textFields}
          label="New City"
          name="new-city"
          value={newCity}
          onChange={e => setNewCity(e.target.value)}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="new-state-select">
           New State
          </InputLabel>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={newState}
            onChange={handleChange}
            inputProps={{
              name: "new-state",
              id: "user-select-new-state"
            }}
          >
            <MenuItem value={"AL"}>Alabama</MenuItem>
            <MenuItem value={"AK"}>Alaska</MenuItem>
            <MenuItem value={"AZ"}>Arizona</MenuItem>
            <MenuItem value={"AR"}>Arkansas</MenuItem>
            <MenuItem value={"CA"}>California</MenuItem>
            <MenuItem value={"CO"}>Colorado</MenuItem>
            <MenuItem value={"CT"}>Connecticut</MenuItem>
            <MenuItem value={"DE"}>Delaware</MenuItem>
            <MenuItem value={"FL"}>Florida</MenuItem>
            <MenuItem value={"GA"}>Georgia</MenuItem>
            <MenuItem value={"HI"}>Hawaii</MenuItem>
            <MenuItem value={"ID"}>Idaho</MenuItem>
            <MenuItem value={"IL"}>Illinois</MenuItem>
            <MenuItem value={"IN"}>Indiana</MenuItem>
            <MenuItem value={"IA"}>Iowa</MenuItem>
            <MenuItem value={"KS"}>Kansas</MenuItem>
            <MenuItem value={"KY"}>Kentucky</MenuItem>
            <MenuItem value={"LA"}>Louisiana</MenuItem>
            <MenuItem value={"ME"}>Maine</MenuItem>
            <MenuItem value={"MD"}>Maryland</MenuItem>
            <MenuItem value={"MA"}>Massachusetts</MenuItem>
            <MenuItem value={"MI"}>Michigan</MenuItem>
            <MenuItem value={"MN"}>Minnesota</MenuItem>
            <MenuItem value={"MS"}>Mississippi</MenuItem>
            <MenuItem value={"MO"}>Missouri</MenuItem>
            <MenuItem value={"MT"}>Montana</MenuItem>
            <MenuItem value={"NE"}>Nebraska</MenuItem>
            <MenuItem value={"NV"}>Nevada</MenuItem>
            <MenuItem value={"NH"}>New Hampshire</MenuItem>
            <MenuItem value={"NJ"}>New Jersey</MenuItem>
            <MenuItem value={"NM"}>New Mexico</MenuItem>
            <MenuItem value={"NY"}>New York</MenuItem>
            <MenuItem value={"NC"}>North Carolina</MenuItem>
            <MenuItem value={"ND"}>North Dakota</MenuItem>
            <MenuItem value={"OH"}>Ohio</MenuItem>
            <MenuItem value={"OK"}>Oklahoma</MenuItem>
            <MenuItem value={"OR"}>Oregon</MenuItem>
            <MenuItem value={"PA"}>Pennsylvania</MenuItem>
            <MenuItem value={"RI"}>Rhode Island</MenuItem>
            <MenuItem value={"SC"}>South Carolina</MenuItem>
            <MenuItem value={"SD"}>South Dakota</MenuItem>
            <MenuItem value={"TN"}>Tennessee</MenuItem>
            <MenuItem value={"TX"}>Texas</MenuItem>
            <MenuItem value={"UT"}>Utah</MenuItem>
            <MenuItem value={"VT"}>Vermont</MenuItem>
            <MenuItem value={"VA"}>Virginia</MenuItem>
            <MenuItem value={"WA"}>Washington</MenuItem>
            <MenuItem value={"WV"}>West Virginia</MenuItem>
            <MenuItem value={"WI"}>Wisconsin</MenuItem>
            <MenuItem value={"WY"}>Wyoming</MenuItem>
          </Select>
        </FormControl>
      


      <Link to="/">
        {" "}
        <Button className={classes.button} onClick={handleSubmit} variant="contained">
          Submit Changes
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
  { editGroup }
)(EditGroup);
