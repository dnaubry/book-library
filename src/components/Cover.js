import React from 'react';

function Cover (props) {
  const root_url = 'https://covers.openlibrary.org/b/id/';

    return (
      <img
        src={`${root_url}${props.cover_i}-${props.size}.jpg`}
        alt={`Cover for ${props.title}`}
      />
    )
}

export default Cover;
