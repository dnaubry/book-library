import React from 'react';
import PropTypes from 'prop-types';

function Cover (props) {
  const size = props.coverSize === 'small' ? 'zoom=5' : 'zoom=6';
  const coverImage = `https://books.google.com/books/content?id=${props.id}&printsec=frontcover&img=1&${size}&source=gbs_api`;
  
  return (
    <img
      src={coverImage}
      alt={`Cover for ${props.title}`}
    />
  )
}

Cover.propTypes = {
  id: PropTypes.string.isRequired,
  coverSize: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Cover;
