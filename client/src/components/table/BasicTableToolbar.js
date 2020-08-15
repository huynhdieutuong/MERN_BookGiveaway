import React from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, InputBase, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const BasicTableToolbar = ({
  tableName,
  addButton = false,
  onSearch = false,
}) => {
  const classes = useToolbarStyles();
  const history = useHistory();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        {tableName}
      </Typography>
      {onSearch && (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={onSearch}
          />
        </div>
      )}
      {addButton && (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => history.push(addButton)}
        >
          Add
        </Button>
      )}
    </Toolbar>
  );
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
    },
    border: '1px solid #cfcece',
    borderRadius: '4px',
  },
}));

export default BasicTableToolbar;
