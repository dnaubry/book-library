import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Book from './Book';

function BookList (props) {
  let books = props.books;
  const query = props.query,
    sort = props.sort,
    sortOrder = props.sortOrder;

  const order = sortOrder ? ['desc'] : ['asc'];

  if (query !== null && query !== 'all') {
    books = _.filter(books, book => {
      return book.status === query;
    })
  }

  if (sort !== null) {
    books = _.orderBy(books, book => {
      return book[sort];
    }, order);
  }

  const numOfBooks = books !== null ? Object.keys(books).length : 0;

  return (
    <div className='book-list'>
    {numOfBooks === 0 
      ? <p className='book-list-no-books'>No books found. Select a new view or add some more books</p>
      : <ul className="list">
          {_.map(books, book => {
            return (
              <li
                className='list-item'
                key={book.id}
                onClick={event => props.handleClick(book)}>
                <Book book={book} coverSize='l' />
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

BookList.propTypes = {
  books: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  sortOrder: PropTypes.bool.isRequired
}

export default BookList; 
        