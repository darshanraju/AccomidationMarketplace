import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';

import { renderTextField, renderRating } from '../utils/renderFormComponents';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const maxValue = value =>
    value && value > 5 ? 'Ratings within 1-5' : undefined
const minValue = value =>
    value && value < 0 ? 'Ratings within 1-5' : undefined

class ReviewTripForm extends Component {
    state = {
        value: 0
    };

    updateRating = (e) => {
        this.setState({ value: Number(e.target.value) })
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field name="description" component={renderTextField} label="Description" validate={required} />
                </div>
                <div>
                    <Field name="rating" component={renderRating} />
                </div>
                <Button variant="contained" color="primary" type="submit">Save Review</Button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ReviewTripForm',
})(ReviewTripForm);




