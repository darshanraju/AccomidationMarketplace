import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../utils/renderFormComponents';

import asyncValidate from '../../utils/asyncValidate'

const required = value => (value || typeof value === 'number' ? undefined : 'Required')


class LoginUserForm extends Component {
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        <Field name="username" component={renderTextField} label="Username" validate={required} />
                    </div>
                    <div><Field name="password" component={renderTextField} label="Password" type="password" validate={required} /></div>
                    <Button type="submit">Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

export default reduxForm({ form: 'loginUser', asyncValidate })(LoginUserForm);