import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <React.Fragment>
        <Box component="form" display="flex" width={1/4} flexDirection="column" justifyContent="center">
          <TextField
            label="Enter your Username"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <TextField
            type="password"
            label="Enter your Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
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