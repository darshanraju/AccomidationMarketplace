import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../utils/renderFormComponents';

class SearchBarForm extends Component {
  render () {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field name="suburb" label="Search Suburb" component={renderTextField} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'searchBarForm',
})(SearchBarForm);