import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

class SearchPage extends Component {
  render () {
    return (
      <Grid container direction="column" spacing={3}>
        { this.props.sProperties.properties.map((currentProperty) => (
          <Grid item xs={3} key={currentProperty.id}>
            <Paper>
              <Typography variant="subtitle2">Address: {currentProperty.address}</Typography>
              <Typography variant="subtitle2">Bathrooms: {currentProperty.no_bathrooms}</Typography>
              <Typography variant="subtitle2">Fits: {currentProperty.no_guests} people</Typography>
              <Typography variant="subtitle2">Price: ${currentProperty.price}/night</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    sProperties: state.sProperties
  };
};

export default connect(mapStateToProps)(SearchPage);