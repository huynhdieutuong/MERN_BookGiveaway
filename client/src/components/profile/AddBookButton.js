import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Fab
        color='secondary'
        className={classes.fab}
        aria-label='add'
        onClick={() => history.push('/add-book')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
