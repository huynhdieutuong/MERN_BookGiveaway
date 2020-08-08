import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Grid, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import FormikField from '../formik-fields/FormikField';
import ProfileContext from '../../contexts/profile/profileContext';

const EditProfileForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { error, profile, updateProfile } = useContext(ProfileContext);

  const initialValues = {
    name: profile.name,
    username: profile.username,
  };

  const onSubmit = async (values, { resetForm }) => {
    const { name, username } = values;

    if (!loading) {
      setMessage(null);
      setLoading(true);
      const success = await updateProfile({ name, username });
      setLoading(false);

      if (success) {
        setMessage('Profile updated successfully');
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
                      name='name'
                      label='Name'
                      required
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      name='username'
                      label='Username'
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
                    Save
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required!'),
  username: Yup.string().required('Required!'),
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

export default EditProfileForm;
