import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import FormikField from '../../components/formik-fields/FormikField';
import AuthContext from '../../contexts/auth/authContext';
import SocialButtons from '../../components/auth/SocialButtons';

const SignUp = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { error, message, signUp } = useContext(AuthContext);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const { firstName, lastName, username, email, password } = values;

    if (!loading) {
      setLoading(true);
      const success = await signUp({
        name: `${firstName} ${lastName}`,
        username,
        email,
        password,
      });
      setLoading(false);

      if (success) resetForm();
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h2' variant='h5'>
          Sign up
        </Typography>
        {error && (
          <Alert severity='error' style={{ width: '100%', margin: '10px 0' }}>
            {error}
          </Alert>
        )}
        {message ? (
          <Alert severity='success' style={{ width: '100%', margin: '10px 0' }}>
            <AlertTitle>SignUp Success</AlertTitle>
            {message}
          </Alert>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ dirty, isValid, errors, touched }) => {
              return (
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormikField
                        name='firstName'
                        label='First Name'
                        required
                        errors={errors}
                        touched={touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormikField
                        name='lastName'
                        label='Last Name'
                        required
                        errors={errors}
                        touched={touched}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikField
                        name='email'
                        label='Email'
                        required
                        errors={errors}
                        touched={touched}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikField
                        name='username'
                        label='User name'
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
                      Sign In
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
        )}

        <Grid container justify='flex-end'>
          <Grid item>
            <Link to='/sign-in' variant='body2'>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>

        <SocialButtons />
      </div>
    </Container>
  );
};

const usernameRegex = /^\w+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').required('Required!'),
  lastName: Yup.string().min(2, 'Too Short!').required('Required!'),
  email: Yup.string().email('Must be a valid email!').required('Required!'),
  username: Yup.string()
    .matches(usernameRegex, 'Must not be contain special symbol or whitespace!')
    .min(5, 'Minimum 5 characters required!')
    .max(20, 'Maximum 20 characters required!')
    .required('Required!'),
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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    margin: theme.spacing(1),
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

export default SignUp;
