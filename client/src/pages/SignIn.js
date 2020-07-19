import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import FormikField from '../components/formik-fields/FormikField';

const SignIn = () => {
  const classes = useStyles();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h2' variant='h5'>
          Sign in
        </Typography>
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
                      name='email'
                      label='Email'
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
                </Grid>
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={!dirty || !isValid}
                >
                  Sign In
                </Button>
              </Form>
            );
          }}
        </Formik>
        <Grid container>
          <Grid item xs>
            <Link to='/forgot-password' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to='/sign-up' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required!'),
  password: Yup.string().required('Required!'),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default SignIn;
