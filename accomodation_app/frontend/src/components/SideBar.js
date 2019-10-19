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
import { NavLink } from 'react-router-dom';

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
      </Drawer>
    )
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);