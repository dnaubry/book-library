import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import { auth, base } from '../utils/firebase.js';
import BookDetail from './BookDetail';
import BookList from './BookList';
import BookListMenu from './BookListMenu';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      selectedBook: null,
      query: 'all',
      sort: 'added',
      sortOrder: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.writeBookStatus = this.writeBookStatus.bind(this);
    this.queryBooks = this.queryBooks.bind(this);
    this.sortBooks = this.sortBooks.bind(this);
  }

  componentDidMount() {
    this.uid = auth.currentUser.uid;
    this.ref = base.syncState(`library/${this.uid}/books`, {
      context: this,
      state: 'books'
    });

    
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  
  }

  handleClick(book) {
    this.setState(() => {
      return {
        selectedBook: book
      }
    })
  }

  writeBookStatus(index, option) {
     this.setState((prevState) => {
      const newState = prevState.books;
      newState[index].status = option;
      
      return {
        books: Object.assign({}, newState)
      }
    });
  }

  deleteBook(index) {
    base.remove(`library/${this.uid}/books/${index}`)
      .then(() => {
        this.setState({
          selectedBook: null
        });
      });
  }

  queryBooks(event) {
    const option = event.target.value;
    this.setState({
      selectedBook: null,
      query: option
    });
  }

  sortBooks(event) {
    const option = event.target.value;
    const order = !this.state.sortOrder
    this.setState({
      selectedBook: null,
      sort: option,
      sortOrder: order
    });
  }

  render() {
    const books = this.state.books,
      selectedBook = this.state.selectedBook;
    
    return (
      <div className='library'>
        <BookListMenu
          queryBooks={this.queryBooks} query={this.state.query}
          sortBooks={this.sortBooks} sort={this.state.sort}
          clearQuery={this.clearQuery} />
        {books !== null &&
          <BookList 
              handleClick={this.handleClick} 
              books={books}
              query={this.state.query}
              sort={this.state.sort}
              sortOrder={this.state.sortOrder} />}
        {selectedBook !== null &&
           <BookDetail 
              book={selectedBook}
              index={selectedBook.id}
              writeBookStatus={this.writeBookStatus}
              deleteBook={this.deleteBook}
              />}
        <ScrollToTop showUnder={160}>
          <span className='scroll-to-top'>&#9650;</span>
        </ScrollToTop>
      </div>
    );
  }
}

export default Library;