import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import FormikField from '../formik-fields/FormikField';
import BookContext from '../../contexts/book/bookContext';
import UploadImages from './UploadImages';

const EditBookForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { book, categories, editBook } = useContext(BookContext);
  const [loading, setLoading] = useState(false);
  const [files, getFiles] = useState(null);
  const [description, getDescription] = useState(
    '<p>' + book.description.replace(/\n\n/g, '</p><p>') + '</p>'
  );
  const [category, getCategory] = useState(book.category);

  const initialValues = {
    title: book.title,
    author: book.author,
  };

  const onSubmit = async (values, { resetForm }) => {
    const { title, author } = values;

    if (!loading) {
      setLoading(true);

      const formData = new FormData();
      if (files) {
        files.forEach((file) => formData.append('images', file));
      }
      formData.append('title', title);
      formData.append('author', author);
      formData.append('category', category._id);
      formData.append(
        'description',
        description.replace(/<p>/g, '').replace(/<\/p>/g, '\n\n')
      );
      const success = await editBook(book._id, formData);
      setLoading(false);

      if (success) {
        history.push('/profile');
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ dirty, isValid, errors, touched }) => {
        return (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <UploadImages getFiles={getFiles} imageUrls={book.imageUrls} />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormikField
                      name='title'
                      label='Title'
                      required
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikField
                      name='author'
                      label='Author'
                      required
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id='category'
                    value={category}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    className={classes.category}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Select category *'
                        variant='outlined'
                      />
                    )}
                    onChange={(e, value) => getCategory(value ? value : null)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.description}>
                    Description *:
                  </Typography>
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      getDescription(data);
                    }}
                    config={{ enterMode: 'ENTER_BR' }}
                  />
                </Grid>
                <div className={classes.wrapper}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    disabled={!isValid || loading || !description || !category}
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
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required!'),
  author: Yup.string().required('Required!'),
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
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  description: {
    margin: '10px 0 5px 0',
  },
  category: {
    margin: '15px 0 0 0',
  },
}));

export default EditBookForm;
