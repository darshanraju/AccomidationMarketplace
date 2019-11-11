import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import UpdateTripForm from './UpdateTripForm';
import { updateTrip } from '../actions';

class ViewTrip extends Component {
  submit = (formValues) => {
    this.props.updateTrip(formValues, this.props.userTrips.selectedTrip.id);
  }
  
  render () {
    const selectedTrip = this.props.userTrips.selectedTrip || {};
    return (
      <React.Fragment>
        <Typography variant="subtitle2">id: {selectedTrip.id}</Typography>
        <Typography variant="subtitle2">Checkin: {selectedTrip.checkin}</Typography>
        <Typography variant="subtitle2">Checkout: {selectedTrip.checkout}</Typography>
        <Typography variant="subtitle2">Guests: {selectedTrip.no_guests} people</Typography>
        <UpdateTripForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { userTrips: state.userTrips };
};

export default connect(mapStateToProps, { updateTrip })(ViewTrip);