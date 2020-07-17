import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NearMeIcon from '@material-ui/icons/NearMe';

import BookContext from '../../contexts/book/bookContext';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 400,
    backgroundColor: '#f2f2f2',
  },
});

const SortBy = () => {
  const classes = useStyles();
  const { filters, setFilters } = useContext(BookContext);

  return (
    <BottomNavigation
      value={filters.sort}
      onChange={(event, newValue) => {
        setFilters({
          ...filters,
          sort: newValue,
          page: 1,
        });
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        value='-createAt'
        label='Newest'
        icon={<NewReleasesIcon />}
      />
      <BottomNavigationAction
        value='title'
        label='Title'
        icon={<SortByAlphaIcon />}
      />
      <BottomNavigationAction label='Hot' icon={<WhatshotIcon />} />
      <BottomNavigationAction label='Nearme' icon={<NearMeIcon />} />
    </BottomNavigation>
  );
};

export default SortBy;
