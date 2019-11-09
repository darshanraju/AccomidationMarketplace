import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class ViewProperty extends Component {
  render () {
    const selectedProperty = this.props.sProperties.selectedProperty || {};
    return (
      <React.Fragment>
        <Typography variant="subtitle2">id: {selectedProperty.id}</Typography>
        <Typography variant="subtitle2">Bathrooms: {selectedProperty.no_bathrooms}</Typography>
        <Typography variant="subtitle2">Fits: {selectedProperty.no_guests} people</Typography>
        <Typography variant="subtitle2">Price: ${selectedProperty.price}/night</Typography>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { sProperties: state.sProperties };
};

export default connect(mapStateToProps)(ViewProperty);