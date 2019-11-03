import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../utils/renderFormComponents';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined

class RegisterUserForm extends Component {
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.props.handleSubmit}>
                    <div><Field name="username" component={renderTextField} label="Username" validate={required} /></div>
                    <div><Field name="email" component={renderTextField} label="Email" validate={[required, email]} /></div>
                    <div><Field name="first_name" component={renderTextField} label="FirstName" validate={required} /></div>
                    <div><Field name="last_name" component={renderTextField} label="LastName" validate={required} /></div>
                    <div><Field name="password" component={renderTextField} label="password" type="password" validate={required} /></div>
                    <Button type="submit">Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

export default reduxForm({ form: 'registerUser' })(RegisterUserForm);