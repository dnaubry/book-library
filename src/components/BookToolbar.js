import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class BookToolbar extends React.Component {
  render() {
    const book = this.props.book;
    const options = ['to-read', 'reading', 'have-read'];
    return (
      <ButtonToolbar className='book-toolbar'>
          <ButtonGroup>
            <DropdownButton 
              title={book.status ? book.status : 'select one'}
              id='read-status'
              onSelect={this.props.writeBookStatus.bind(null, this.props.index)}
              >
              {options.map(status => {
                return (
                  <MenuItem key={status} eventKey={status}>{status}</MenuItem>
                )
              })}
            </DropdownButton>
          </ButtonGroup>
          <Button
            bsStyle="link"
            onClick={this.props.deleteBook.bind(null, this.props.index)}>
              Delete Book
          </Button>
      </ButtonToolbar>
    )
  }
}

export default BookToolbar;
