import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { login, logout } from '../actions';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

class NavBar extends Component  {
  render () {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar display="flex">
          <Typography variant="h3">Accomodation App</Typography>
          <Box flexGrow={1} />
          {this.props.auth.loggedIn ?
            <Button onClick={this.props.logout}>Logout</Button> :
            <Button onClick={this.props.login}>Login</Button> 
          }
        </Toolbar>
      </AppBar>
    )
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { login, logout })(withStyles(styles)(NavBar));