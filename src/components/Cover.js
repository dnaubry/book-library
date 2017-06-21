import React from 'react';
import PropTypes from 'prop-types';

function Cover (props) {
  let imageUrl = props.cover;
  let urlLength = imageUrl.length;
  imageUrl = imageUrl.substr(0, 45) + props.size + imageUrl.substring(46, urlLength);
  
  return (
    <img
      src={!props.cover.includes('nophoto')
            ? imageUrl
            : props.cover}
      alt={`Cover for ${props.title}`}
    />
  )
}

Cover.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Cover;
