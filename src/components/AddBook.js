import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScrollToTop from 'react-scroll-up';
import { base } from '../utils/firebase';
import api from '../utils/api';
import SearchForm from './SearchForm';
import Book from './Book';

function AddSelected (props) {    
    return (
      <div className='add-selected'>
        <button 
          className='add-selected-btn'
          onClick={props.onAddSelectedClick}>
          Add selected to library
        </button>
        <p>Click a book to select it</p>
      </div>
    )
}

AddSelected.propTypes = {
  onAddSelectedClick: PropTypes.func.isRequired
}

function DisplayResults (props) {
  return (
    ( Object.keys(props.results).length === 0 )
    ? ( <div className='no-results'>No results</div> )
    : ( <div className='results'>
          <AddSelected 
            onAddSelectedClick={props.onAddSelectedClick} />
          <ul>
          {_.map(props.results, (book, index) => {
            return (
              <li
                key={index}>
                  <input type='checkbox' className='results-checkbox' id={book.id} value={book.id} />
                  <label className='results-checkbox-label' htmlFor={book.id}>
                    <Book book={book} coverSize='m'>
                      <p className='title'>{book.title}</p>
                      <p className='author'>Author: {book.author}</p>
                    </Book>
                  </label>
              </li>
            )
          })}
          </ul>
          <ScrollToTop showUnder={160}>
            <span className='scroll-to-top'>&#9650;</span>
          </ScrollToTop>
        </div>)
  )
}

DisplayResults.propTypes = {
  results: PropTypes.object.isRequired,
}

class AddBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      results: null,
      selectedBooks: null,
      selectedBooksData: null
    };

    this.handleAddSelectedClick = this.handleAddSelectedClick.bind(this);
  }

  getSearchResults(term) {
    api.search(term)
      .then(results => {
        results = _.mapKeys(results, 'id');

        this.setState({ results });
      })
  }

  writeSelectedBooks() {
    const selectedBooks = this.state.selectedBooks;
    const selectedBooksData = this.state.selectedBooksData;
    const results = this.state.results;

    selectedBooks.forEach(bookId=> {
      let baseMatchedBook = _.pickBy(results, (val, bookKey) => {
        return bookKey === bookId;
      });

      let additionalBookData = _.pickBy(selectedBooksData, (val, bookKey) => {
        return bookKey === bookId;
      });

      let matchedBook = {};
      matchedBook[bookId] = {};

      Object.assign(matchedBook[bookId], baseMatchedBook[bookId], additionalBookData[bookId]);

      base.update('books', {
        data: matchedBook
      }).then(() => {
        this.props.history.push('/');
      });
    });
  }


  handleAddSelectedClick() {
    const selectedCheckboxes = document.querySelectorAll('.results-checkbox:checked');
    
    let selectedBooks = _.map(selectedCheckboxes, book => {
      return book.value;
    });
   
    const bookDataPromises = selectedBooks.map(bookId => {
      return api.fetchBookData(bookId)
        .then(bookData => {
        return bookData;
      })
    });

    Promise.all(bookDataPromises).then(results => {
      var selectedBooksData = results;
      selectedBooksData = _.mapKeys(selectedBooksData, 'id');
      this.setState({ selectedBooks, selectedBooksData },
        this.writeSelectedBooks
        );
    });
  }
  
  render() {
    return (
      <div className='add-book'>
        <SearchForm 
          id='add-book-search'
          onSearchSubmit={term => this.getSearchResults(term)} />
        {this.state.results !== null &&
          <DisplayResults
            results={this.state.results}
            onAddSelectedClick={this.handleAddSelectedClick} />}
      </div>
    )
  }
}

export default AddBook;
