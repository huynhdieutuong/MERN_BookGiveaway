import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import FormikField from '../../components/formik-fields/FormikField';
import AuthContext from '../../contexts/auth/authContext';

const ForgotPassword = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { message, error, forgotPassword } = useContext(AuthContext);

  const initialValues = {
    email: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const { email } = values;

    if (!loading) {
      setLoading(true);
      const success = await forgotPassword({ email });
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
          Forgot password
        </Typography>
        {error && (
          <Alert severity='error' style={{ width: '100%', margin: '10px 0' }}>
            {error}
          </Alert>
        )}
        {message ? (
          <Alert severity='success' style={{ width: '100%', margin: '10px 0' }}>
            <AlertTitle>Email Sent</AlertTitle>
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
                    <Grid item xs={12}>
                      <FormikField
                        name='email'
                        label='Email'
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
                      Continue
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
      </div>
    </Container>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required!'),
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

export default ForgotPassword;
