import React from 'react';
import PropTypes from 'prop-types';

function BookListMenu (props) {
  const options = ['all', 'to-read', 'reading', 'have-read'];
  const sortOptions = ['added', 'title', 'author'];

  return (
    <div className='book-list-menu'>
      <div className='query-options'>
        <p>View:</p>
          {options.map(option => {
            return (
              <button
                key={option}
                value={option}
                className={option === props.query
                  ? 'menu-btn active' : 'menu-btn'}
                onClick={event => props.queryBooks(event)}>
                {option}
              </button>
            )
          })}
      </div>
      <div className='sort-options'>
        <p>Sort by:</p>
          {sortOptions.map(option => {
            return (
              <button
                key={option}
                value={option}
                className={option === props.sort
                  ? 'menu-btn active sort' : 'menu-btn'}
                onClick={event => props.sortBooks(event)}>
                {option}
              </button>
            )
          })}
      </div>
    </div>
  )
}

BookListMenu.propTypes = {
  query: PropTypes.string.isRequired,
  queryBooks: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  sortBooks: PropTypes.func.isRequired
}

export default BookListMenu;