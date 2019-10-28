import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions';

const drawerWidth = '15vw';

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

class SideBar extends Component {
  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer 
        className={classes.drawer}
        classes={{paper: classes.drawerPaper}} 
        variant="permanent"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem component={NavLink} to="profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem component={NavLink} to="trips">
            <ListItemIcon><AirportShuttleIcon /></ListItemIcon>
            <ListItemText primary="Trips" />
          </ListItem>
          <ListItem component={NavLink} to="properties">
            <ListItemIcon><HomeWorkIcon /></ListItemIcon>
            <ListItemText primary="Properties" />
          </ListItem>
        </List>
        <Box flexGrow={1} />
        <Button onClick={this.handleLogout}>Logout</Button>
      </Drawer>
    )
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { logout })(withRouter(withStyles(styles)(SideBar)));