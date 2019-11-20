import React from 'react';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Rating from '@material-ui/lab/Rating';

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

export const renderKeyboardDatePicker = (props) => {
  const {
    meta: { error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = (date) => {
    Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
  };

  return (
    <KeyboardDatePicker
      onChange={onChange}
      format="dd/MM/yyyy"
      value={value ? new Date(value) : null}
      disablePast={true}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      error={error && touched}
      {...inputProps}
      {...others}
    />
  )
};

export const renderSelectField = ({
  input,
  label,
  children,
  ...custom
}) => (
    <React.Fragment>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        id={name}
      >
        {children}
      </Select>
    </React.Fragment>
  )

export const numericOptions = () => {
  const maxNum = 15;
  const options = [];
  for (let i = 1; i < maxNum + 1; i++) {
    options.push(<option key={i} value={i}>{i + '+'}</option>);
  }
  return options;
}

export const renderCheckbox = ({
  input,
  label,
  ...custom
}) => (
    <React.Fragment>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
            color="primary"
            {...custom}
            id={name}
          />
        }
        label={label}
      />
    </React.Fragment>
  )

export const renderRating = ({
  input,
  label,
  ...custom
}) => (
    <React.Fragment>
      <FormControlLabel
        control={
          <Rating
            name="rating-controlled"
            value={input.value}
            precision={0.5}
            onChange={input.onChange}
            {...custom}
          />
        }
        label={label}
      />
    </React.Fragment>
  )
