import React from 'react';
import PropTypes from 'prop-types'
import Cover from './Cover';

function Book (props) {
  const book = props.book;
  return (
    <div className='book'>
      <Cover
        cover={book.cover}
        size={props.coverSize}
        title={book.title} />
      <div className='book-info'>
        {props.children}
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book;
