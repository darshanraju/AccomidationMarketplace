import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchUserProperties } from '../../actions';

class PropertiesPage extends Component {
  componentDidMount () {
    this.props.fetchUserProperties(this.props.auth.user.id);
  }

  render () {
    return (
      <Grid container spacing={3}>
        { this.props.uProperties.properties.map((currentProperty) => (
          <Grid item xs={3} key={currentProperty.id}>
            <Paper>
              <Typography variant="subtitle2">Address: {currentProperty.address}</Typography>
              <Typography variant="subtitle2">Bathrooms: {currentProperty.no_bathrooms}</Typography>
              <Typography variant="subtitle2">Fits: {currentProperty.no_guests} people</Typography>
              <Typography variant="subtitle2">Price: ${currentProperty.price}/night</Typography>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={3} component={NavLink} to="/properties/add">
          <Typography variant="subtitle1">Add Property</Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    auth: state.auth,
    uProperties: state.uProperties 
  };
};

export default connect(mapStateToProps, { fetchUserProperties })(PropertiesPage);