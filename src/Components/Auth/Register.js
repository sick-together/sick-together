import React, { useState } from "react";
import { signup } from "../../Redux/userReducer.js";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './Login.css'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
    padding: theme.spacing(3)
  },
  loginButton: {
    margin: 15
  },
  registerLink: {
    display: 'flex',
  },
  avatarIcon: {
    marginBottom: 10
  },
  staInput: {
    marginBottom: 30
  }
}));

function Register(props){
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [city, setCity] = React.useState('')
  const [state, setStateUS] = React.useState('')

  function signupUser(){
    // let { username, password, city, state } = this.state;
    let profilePic = `https://robohash.org/${username}`;
    props.signup(username, password, profilePic, city, state);
  };
  function handleKeyDown(e){
    if (e.keyCode === 13) {
      this.signupUser();
    }
  };

    let { user } = props;
    const classes = useStyles();
    if (user.loggedIn) return <Redirect to="/dashboard" />;
    return (
      <Container component='main' maxWidth='xs' className={classes.mainContainer}>
          <CssBaseline />
        <Paper className={classes.root}>
          <Avatar className={classes.avatarIcon}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography variant="h5" component="h3">Sign Up</Typography>

          <TextField 
          id='standard-name'
          label='Username'
          name='username'
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
          name='password'
          required
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={classes.passField}
          type="password"
          margin="normal"
          />
          <TextField 
          id='city-input'
          label='City'
          name='city'
          required
          fullWidth
          value={city}
          onChange={e => setCity(e.target.value)}
          margin='normal'
          />

          <TextField 
          id='state-input'
          label='State'
          name='state'
          required
          fullWidth
          value={state}
          onChange={e => setStateUS(e.target.value)}
          className={classes.staInput}
          margin='normal'
          />
          
            <Button variant='contained' color='primary' fullWidth className={classes.loginButton} onClick={signupUser} onKeyDown={handleKeyDown}>Register</Button>
              <Grid className={classes.registerLink}>
                <Typography>Already have an account? </Typography>
                <Link to='/' className="SignUp-Link">
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
