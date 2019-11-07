import React from 'react';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { format, parseISO } from 'date-fns';

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
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      error={error && touched}
      {...inputProps}
      {...others}
    />
  )
};