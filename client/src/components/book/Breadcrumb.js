import React, { useContext } from 'react';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';

import BookContext from '../../contexts/book/bookContext';

const Breadcrumb = () => {
  const {
    book: { category, title },
  } = useContext(BookContext);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {category.ancestors.map((ancestor) => (
        <Link color='inherit' href={`/${ancestor.slug}/${ancestor._id}`}>
          {ancestor.name}
        </Link>
      ))}
      <Link color='inherit' href={`/${category.slug}/${category._id}`}>
        {category.name}
      </Link>
      <Typography color='textPrimary'>{title}</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
