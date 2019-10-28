import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { fade, withStyles } from '@material-ui/core/styles';

import { login } from '../actions';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  search: {
    backgroundColor: fade(theme.palette.common.white, 0.25),
    width: '20%'
  }
});

class NavBar extends Component  {
  state = {
    searchString: ''
  };

  handleTextFieldChange = (event) => {
    if (event.target.value) {
      this.setState({searchString: event.target.value});
    } else {
      this.setState({searchString: ''})
    }
  };

  render () {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar display="flex">
          <Typography variant="h3">Accomodation App</Typography>
          <Box flexGrow={1} />
          {this.props.auth.loggedIn ? 
            <div className={classes.search}>
              <TextField
                label="Search Location"
                type="search"
                fullWidth
                onChange={this.handleTextFieldChange}
              />
            </div> :
            <Button color="inherit" onClick={this.props.login}>Login</Button> 
          }
        </Toolbar>
      </AppBar>
    )
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { login })(withStyles(styles)(NavBar));