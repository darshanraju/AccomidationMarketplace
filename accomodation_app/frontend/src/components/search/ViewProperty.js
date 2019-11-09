import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import BookTripForm from './BookTripForm';
import { bookProperty } from '../../actions';

class ViewProperty extends Component {
  submit = (formValues) => {
    this.props.bookProperty(formValues, this.props.sProperties.selectedProperty.id);
  }
  
  render () {
    const selectedProperty = this.props.sProperties.selectedProperty || {};
    return (
      <React.Fragment>
        <Typography variant="subtitle2">id: {selectedProperty.id}</Typography>
        <Typography variant="subtitle2">Bathrooms: {selectedProperty.no_bathrooms}</Typography>
        <Typography variant="subtitle2">Fits: {selectedProperty.no_guests} people</Typography>
        <Typography variant="subtitle2">Price: ${selectedProperty.price}/night</Typography>
        <BookTripForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { sProperties: state.sProperties };
};

export default connect(mapStateToProps, { bookProperty })(ViewProperty);