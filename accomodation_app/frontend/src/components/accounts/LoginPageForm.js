import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../utils/renderFormComponents';

class LoginUserForm extends Component {
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.props.handleSubmit}>
                    <div><Field name="username" component={renderTextField} label="Username" /></div>
                    <div><Field name="password" component={renderTextField} label="Password" /></div>
                    <Button type="submit">Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

export default reduxForm({ form: 'loginUser' })(LoginUserForm);