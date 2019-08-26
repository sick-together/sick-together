import React, { useState } from "react";
import { login } from "../../Redux/userReducer.js";
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
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import "./Login.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(25),
    padding: theme.spacing(3),
    position: "absolute"
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
  passField: {
    marginBottom: 30
  }
  // mainContainer: {
  //   backgroundImage: 'url(https://images.unsplash.com/photo-1560582861-45078880e48e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)'
  // }
}));

function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function loginUser() {
    props.login(username, password);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      loginUser();
    }
  }

  let { user } = props;
  const classes = useStyles();
  if (user.loggedIn) return <Redirect to="/dashboard" />;
  return (
    <div className="background">
      <Container component="main" className={classes.mainContainer}>
        <CssBaseline />
        <Paper className={classes.root}>
          <Avatar className={classes.avatarIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h3">
            Login
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
            onKeyDown={handleKeyDown}
            className={classes.passField}
            type="password"
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.loginButton}
            onClick={loginUser}
            onKeyDown={handleKeyDown}
          >
            Login
          </Button>

          <Grid className={classes.registerLink}>
            <Typography>Don't have an account? </Typography>
            <Link to="/register" className="SignUp-Link">
              Sign Up
            </Link>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
function mapStateToProps(state) {
  return state.user;
}
export default connect(
  mapStateToProps,
  { login }
)(Login);

