import React from 'react';
import { Link } from 'react-router-dom';

import NotFoundImage from '../../images/notfound.jpg';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link to='/'>
        <img
          src={NotFoundImage}
          alt='not found'
          style={{ maxWidth: '600px', width: '100%' }}
        />
      </Link>
    </div>
  );
};

export default NotFound;
