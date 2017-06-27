import React from 'react';
import Book from './Book';
import BookToolbar from './BookToolbar';

class BookDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shortDescription: null
    }
 
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.book.description.length > 500) {
      this.setState( { shortDescription: true });
    } else {
      this.setState( { shortDescription: null });
    }

    window.scrollTo(0, 500);
  }
 

  handleClick(){
    this.setState( { shortDescription: false });
  }

  render() {
    const book = this.props.book;
    const descriptionLength = book.description.length;
    const shortDescription = book.description.substr(0, 500);
    const remainingDescription = book.description.substr(501, descriptionLength);

    return (
      <div className='book-detail'>
        <Book book={book} coverSize='large'>
          <BookToolbar
            book={book}
            index={this.props.index}
            writeBookStatus={this.props.writeBookStatus}
            deleteBook={this.props.deleteBook}>
          </BookToolbar>
          <p className='title'>{book.title}</p>
          {book.author && <p className='author'>Author: {book.author}</p>}
          {book.publishedDate && <p className='published'>
          Published: {book.publishedDate}</p>}
          {book.description &&
            this.state.shortDescription
            ? (<p className='description'>
                {shortDescription}
                  <button className='show-more-btn' onClick={this.handleClick}>
                    ...show more
                  </button>
                  {!this.state.shortDescription && remainingDescription}
                </p>)
            : <p className='description'>{book.description}</p>}
          {book.link && <p className='link'>Book data from 
            <a href={book.link} target='_blank' rel='noopener noreferrer'> Google Books</a></p>}
        </Book>

      </div>
    );
  }
}

export default BookDetail;
