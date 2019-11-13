import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { updateProperty, fetchProperty } from '../../actions/index';
import ManagePropertyForm from './ManagePropertyForm';

/*
        <Typography variant="subtitle2">id: {selectedProperty.id}</Typography>
        <Typography variant="subtitle2">Bathrooms: {selectedProperty.no_bathrooms}</Typography>
        <Typography variant="subtitle2">Fits: {selectedProperty.no_guests} people</Typography>
        <Typography variant="subtitle2">Price: ${selectedProperty.price}/night</Typography>
*/

class ManageProperty extends Component {
  submit = async (formValues) => {
    await this.props.updateProperty(formValues);
    this.props.fetchProperty(this.props.uProperties.selectedProperty.id);
  }

  render() {
    const selectedProperty = this.props.uProperties.selectedProperty || {};
    return (
      <React.Fragment>
        <ManagePropertyForm onSubmit={(formValues) => this.submit(formValues)} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { uProperties: state.uProperties };
};

export default connect(mapStateToProps, { updateProperty, fetchProperty })(ManageProperty);