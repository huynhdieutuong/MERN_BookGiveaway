import React from 'react';
import {
  Tooltip,
  IconButton,
  Popover,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const DeleteButton = ({ onDelete, label = false }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Tooltip title='Delete'>
      <span>
        <IconButton
          aria-label='delete'
          aria-describedby={id}
          onClick={handleClick}
        >
          <DeleteIcon />
        </IconButton>
        {label && (
          <Typography variant='span' onClick={handleClick}>
            {label}
          </Typography>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'top',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'top',
          }}
        >
          <Typography className={classes.typography}>
            Are you sure to delete? <Button onClick={onDelete}>Yes</Button>{' '}
            <Button onClick={handleClose}>No</Button>
          </Typography>
        </Popover>
      </span>
    </Tooltip>
  );
};

export default DeleteButton;
