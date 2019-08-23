import React, { useState } from "react";
import { signup } from "../../Redux/userReducer.js";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import "./Login.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
    padding: theme.spacing(3)
  },
  loginButton: {
    margin: 15
  },
  registerLink: {
    display: "flex"
  },
  avatarIcon: {
    marginBottom: 10
  },
  staInput: {
    marginBottom: 30
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function Register(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setStateUS] = React.useState("");
  const [open, setOpen] = React.useState(false);

  function signupUser() {
    // let { username, password, city, state } = this.state;
    let profilePic = `https://robohash.org/${username}`;
    props.signup(username, password, profilePic, city, state);
  }
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      signupUser();
    }
  }
  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }
  function handleChange(e) {
    setStateUS(e.target.value);
  }

  let { user } = props;
  const classes = useStyles();
  if (user.loggedIn) return <Redirect to="/dashboard" />;
  return (
    <Container component="main" maxWidth="xs" className={classes.mainContainer}>
      <CssBaseline />
      <Paper className={classes.root}>
        <Avatar className={classes.avatarIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h3">
          Sign Up
        </Typography>

        <TextField
          id="standard-name"
          label="Username"
          name="username"
          required
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="password-input"
          label="Password"
          name="password"
          required
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={classes.passField}
          type="password"
          margin="normal"
        />
        <TextField
          id="city-input"
          label="City"
          name="city"
          required
          fullWidth
          value={city}
          onChange={e => setCity(e.target.value)}
          margin="normal"
        />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="state-select" required margin="normal">
            State
          </InputLabel>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={state}
            onChange={handleChange}
            inputProps={{
              name: "state",
              id: "user-select-state"
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

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.loginButton}
          onClick={signupUser}
        >
          Register
        </Button>
        <Grid className={classes.registerLink}>
          <Typography>Already have an account? </Typography>
          <Link to="/" className="SignUp-Link">
            Login
          </Link>
        </Grid>
      </Paper>
    </Container>
  );
}

function mapStateToProps(state) {
  return state.user;
}
export default connect(
  mapStateToProps,
  { signup }
)(Register);
