import React, { Fragment, useContext } from 'react';
import { Typography } from '@material-ui/core';

import BookContext from '../../contexts/book/bookContext';
import ParticipantItem from './ParticipantItem';

const Participants = () => {
  const { requests } = useContext(BookContext);

  return (
    <Fragment>
      <Typography component='h5' variant='h5'>
        Participants
      </Typography>
      {requests.map((request) => (
        <ParticipantItem key={request._id} request={request} />
      ))}
    </Fragment>
  );
};

export default Participants;
