import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../utils/renderFormComponents';

class RegisterUserForm extends Component {
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.props.handleSubmit}>
                    <div><Field name="username" component={renderTextField} label="Username" /></div>
                    <div><Field name="email" component={renderTextField} label="Email" /></div>
                    <div><Field name="first_name" component={renderTextField} label="FirstName" /></div>
                    <div><Field name="last_name" component={renderTextField} label="LastName" /></div>
                    <div><Field name="password" component={renderTextField} label="password" /></div>
                    <Button type="submit">Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

export default reduxForm({ form: 'registerUser' })(RegisterUserForm);