import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RootRef, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const UploadImages = ({ getFiles }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      getFiles(acceptedFiles);
    },
  });
  const { ref, ...rootProps } = getRootProps();

  const thumbs = files.map((file) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <RootRef rootRef={ref}>
      <Paper {...rootProps} className={classes.paper}>
        <input {...getInputProps()} />
        <Typography>Drag 'n' drop some images here *</Typography>
      </Paper>
      <aside className={classes.thumbsContainer}>{thumbs}</aside>
    </RootRef>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    border: '1px dashed #c6c6c6',
    boxShadow: 'none',
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: '#f2f2f2',
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
}));

export default UploadImages;
