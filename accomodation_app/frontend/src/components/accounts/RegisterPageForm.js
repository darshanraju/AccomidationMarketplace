import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { registerUser } from '../../actions';
import { renderTextField } from '../../utils/renderFormComponents';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(value)
        ? 'Invalid email address'
        : ''

const styles = (theme) => ({
    textField: {
        width: 300,
        marginTop: 10
    },
    button: {
        width: 300,
        backgroundColor: '#3F51B6',
        marginTop: 20,
        color: 'white'
    },
})

class RegisterUserForm extends Component {
    state = {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        first_name: '',
        firstNameError: '',
        last_name: '',
        lastNameError: '',
        password: '',
        passwordError: ''
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
        this.setState({ usernameError: "" });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
        this.setState({ passwordError: "" });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
        this.setState({ emailError: "" });
    }

    handleFirstNameChange = (event) => {
        this.setState({ first_name: event.target.value });
        this.setState({ firstNameError: "" });
    }

    handleLastNameChange = (event) => {
        this.setState({ last_name: event.target.value });
        this.setState({ lastNameError: "" });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        var valid = true;
        if (this.state.username.length == 0) {
            this.setState({ usernameError: "Username required" });
            valid = false;
        }

        if (this.state.password.length == 0) {
            this.setState({ passwordError: "Password required" });
            valid = false;
        }

        if (this.state.first_name.length == 0) {
            this.setState({ firstNameError: "First Name required" });
            valid = false;
        }

        if (this.state.last_name.length == 0) {
            this.setState({ lastNameError: "Last Name required" });
            valid = false;
        }

        var validEmail = '';
        if (this.state.email.length == 0) {
            this.setState({ emailError: "Email required" });
            valid = false;
        } else if (this.state.email.length > 0) {
            validEmail = email(this.state.email);
            if (validEmail.length > 0) {
                this.setState({ emailError: validEmail })
                valid = false
            }
        }

        if (valid) {
            await this.props.registerUser(this.state)
            var emailError = this.props.auth.errorEmail;
            var usernameError = this.props.auth.errorUsername;
            if (emailError.length > 0 || usernameError.length > 0) {
                this.setState({
                    emailError: emailError,
                    usernameError: usernameError,
                })
            } else {
                this.props.history.push('/login');
            }
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        className={classes.textField}
                        name="username"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        error={this.state.usernameError !== ''}
                        helperText={this.state.usernameError}
                        onChange={this.handleUsernameChange}
                        label="Username"
                    />
                    <br />
                    <TextField
                        className={classes.textField}
                        name="email"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        error={this.state.emailError !== ''}
                        helperText={this.state.emailError}
                        onChange={this.handleEmailChange}
                        label="Email"
                    />
                    <br />
                    <TextField
                        className={classes.textField}
                        name="first_name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        error={this.state.firstNameError !== ''}
                        helperText={this.state.firstNameError}
                        onChange={this.handleFirstNameChange}
                        label="First Name"
                    />
                    <br />
                    <TextField
                        className={classes.textField}
                        name="last_name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        error={this.state.lastNameError !== ''}
                        helperText={this.state.lastNameError}
                        onChange={this.handleLastNameChange}
                        label="Last Name"
                    />
                    <br />
                    <TextField
                        className={classes.textField}
                        name="password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        error={this.state.passwordError !== ''}
                        helperText={this.state.passwordError}
                        onChange={this.handlePasswordChange}
                        label="Password"
                    />
                    <br />
                    <Button type="submit" className={classes.button}>Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default compose(
    connect(mapStateToProps, { registerUser }),
    reduxForm({ form: 'registerUser' }),
    withRouter,
    withStyles(styles)
)(RegisterUserForm);