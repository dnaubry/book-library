import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import Rebase from 're-base';
import BookDetail from './BookDetail';
import Cover from './Cover';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAr-xyniDhjy0bmAAiR2htICilgJCBMtk8",
    authDomain: "book-library-fdf7f.firebaseapp.com",
    databaseURL: "https://book-library-fdf7f.firebaseio.com",
    projectId: "book-library-fdf7f",
    storageBucket: "book-library-fdf7f.appspot.com",
    messagingSenderId: "515456586411"
  });
export const base = Rebase.createClass(app.database());

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      selectedBook: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.writeReadStatus = this.writeReadStatus.bind(this);

  }

  componentDidMount() {
      base.syncState('books', {
        context: this,
        state: 'books'
      })
  }

  handleClick(book) {
    this.setState(() => {
      return {
        selectedBook: book
      }
    })
  }

  writeReadStatus(index, status) {
    base.update(`books/${index}`, {
      data: { readStatus: status }
    });
  }

  // writeOwnedStatus(index) {
  //   base.update(`books/${index}`, {
  //     data: { ownedStatus: }
  //   });
  // }

  renderList() {
    return _.map(this.state.books, (book) => {
      return (
        <li
          className="book-list-item"
          key={book.isbn}
          onClick={event => this.handleClick(book)}
        >
          <Cover
            cover_i={book.cover_i}
            size='M'
            title={book.title}
          />
          <h3>{book.title}</h3>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='main-container'>
        <ul className="book-list">
          {this.state.books !== null && this.renderList()}
        </ul>
        {this.state.selectedBook === null
            ? <p>Select a book to view details.</p>
            : <BookDetail 
                book={this.state.selectedBook}
                index={this.state.selectedBook.isbn}
                writeReadStatus={this.writeReadStatus} />}
      </div>
    );
  }
}

export default BookList;