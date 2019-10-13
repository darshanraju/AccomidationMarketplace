import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  }

  render() {
    return (
      <React.Fragment>
        <Box component="form" display="flex" width={1/4} flexDirection="column">
          <TextField
            label="Enter your First Name"
            onChange={(event, newValue) => this.setState({ firstName: newValue })}
          />
          <TextField
            label="Enter your Last Name"
            onChange={(event, newValue) => this.setState({ lastName: newValue })}
          />
          <TextField
            label="Enter your Email"
            type="email"
            onChange={(event, newValue) => this.setState({ email: newValue })}
          />
          <TextField
            label="Enter a Username"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <TextField
            type="password"
            label="Enter your Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <TextField
            type="password"
            label="Confirm your Password"
            onChange={(event, newValue) => this.setState({ passwordConfirm: newValue })}
          />
          <Button label="Submit" />
          <label> Already have the Account? </label>
          <Link to="/login">Login</Link>
        </Box>
      </React.Fragment>
    );
  }
}

export default Register;