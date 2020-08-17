import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteButton from '../table/DeleteButton';
import EditButton from '../table/EditButton';
import BookContext from '../../contexts/book/bookContext';

const ITEM_HEIGHT = 48;

const ActionButton = ({ id }) => {
  const { deleteBook } = useContext(BookContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = async () => {
    const success = await deleteBook(id);

    if (success) history.push('/');
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <EditButton editButton='/edit-book' id={id} label='Edit' />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteButton onDelete={onDelete} label='Delete' />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ActionButton;
