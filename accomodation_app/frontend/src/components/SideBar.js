import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = '20vw';

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
        <h1>Hello, I'm a sidebar</h1>
      </Drawer>
    )
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);