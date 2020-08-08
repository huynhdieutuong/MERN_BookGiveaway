import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Grid, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import FormikField from '../formik-fields/FormikField';
import ProfileContext from '../../contexts/profile/profileContext';

const ChangePasswordForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { error, changePassword } = useContext(ProfileContext);

  const initialValues = {
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const { currentPassword, password } = values;

    if (!loading) {
      setMessage(null);
      setLoading(true);
      const success = await changePassword({ currentPassword, password });
      setLoading(false);

      if (success) {
        setMessage('Password changed successfully');
        resetForm();
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div>
        {message && (
          <Alert severity='success' style={{ width: '100%', margin: '10px 0' }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity='error' style={{ width: '100%', margin: '10px 0' }}>
            {error}
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ dirty, isValid, errors, touched }) => {
            return (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormikField
                      name='currentPassword'
                      type='password'
                      label='Current Password'
                      required
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      name='password'
                      type='password'
                      label='Password'
                      required
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      name='passwordConfirm'
                      type='password'
                      label='Confirm Password'
                      required
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                </Grid>
                <div className={classes.wrapper}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    disabled={!dirty || !isValid || loading}
                  >
                    Change Password
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Required!'),
  password: Yup.string()
    .matches(
      strongPasswordRegex,
      'Number, uppercase, lowercase and special character required!'
    )
    .min(8, 'Minimum 8 characters required!')
    .max(100, 'Maximum 100 characters required!')
    .required('Required!'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same!')
    .required('Required!'),
});

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    margin: theme.spacing(0),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default ChangePasswordForm;
