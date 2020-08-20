import React, { useContext, useState } from 'react';
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
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import FormikField from '../../components/formik-fields/FormikField';
import AuthContext from '../../contexts/auth/authContext';
import SocialButtons from '../../components/auth/SocialButtons';

const SignIn = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { error, signIn, resetState } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    if (!loading) {
      setLoading(true);
      const success = await signIn({ email, password });
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
          Sign in
        </Typography>
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
        <Grid container>
          <Grid item xs>
            <Link
              to='/forgot-password'
              className={classes.link}
              onClick={resetState}
              variant='body2'
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              to='/sign-up'
              className={classes.link}
              onClick={resetState}
              variant='body2'
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>

        <SocialButtons />
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
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  link: {
    color: '#3f51b5',
    textDecoration: 'none',
  },
}));

export default SignIn;
