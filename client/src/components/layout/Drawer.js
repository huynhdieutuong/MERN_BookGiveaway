import React from 'react';
import { Drawer, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CategoryTree from '../books/CategoryTree';

const TemporaryDrawer = ({ isOpen, toggleDrawer }) => {
  return (
    <Drawer anchor='left' open={isOpen} onClose={() => toggleDrawer(false)}>
      <div style={{ width: 250, padding: 10 }}>
        <Link
          to='/'
          style={{
            backgroundColor: '#3f51b5',
            color: 'white',
            textDecoration: 'none',
            width: '100%',
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Typography variant='h6'>Book Giveaway</Typography>
        </Link>
        <CategoryTree />
      </div>
    </Drawer>
  );
};

export default TemporaryDrawer;
