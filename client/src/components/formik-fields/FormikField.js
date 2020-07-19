import React from 'react';
import { ErrorMessage, FastField } from 'formik';
import { TextField } from '@material-ui/core';

const FormikField = ({
  name,
  label,
  type = 'text',
  required = false,
  errors,
  touched,
}) => {
  return (
    <FastField
      as={TextField}
      name={name}
      label={label}
      type={type}
      required={required}
      autoComplete='off'
      variant='outlined'
      fullWidth
      error={errors[name] && touched[name] ? true : false}
      helperText={<ErrorMessage name={name} />}
    />
  );
};

export default FormikField;
