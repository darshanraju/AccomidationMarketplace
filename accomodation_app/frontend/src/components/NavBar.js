import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar display="flex">
        <Typography variant="h3">Accomodation App</Typography>
        <Box flexGrow={1} />
        <Button color="inherit" component={Link} to="register">Register</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  )
};

export default NavBar