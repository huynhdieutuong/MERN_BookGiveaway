import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tooltip, IconButton, Typography } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

const EditButton = ({ editButton, id, label = false }) => {
  const history = useHistory();

  return (
    <Tooltip title='Edit'>
      <span>
        <IconButton
          aria-label='edit'
          aria-describedby={id}
          onClick={() => history.push(`${editButton}/${id}`)}
        >
          <EditIcon />
        </IconButton>
        {label && (
          <Typography
            variant='span'
            onClick={() => history.push(`${editButton}/${id}`)}
          >
            {label}
          </Typography>
        )}
      </span>
    </Tooltip>
  );
};

export default EditButton;
