import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import Cover from './Cover';

function BookDetail (props) {
  return (
    <div className="book-detail">
      <Cover 
          cover_i={props.book.cover_i}
          size='L'
          title={props.book.title}
        />
      <div className="book-detail-body">
        <div className="book-detail-content">
          <h2>{props.book.title}</h2>
          <h3>Author: {props.book.author}</h3>
        </div>
         <div className="book-detail-footer">
          <ButtonToolbar>
            <ButtonGroup>
              <DropdownButton 
                title={props.book.readStatus ? props.book.readStatus : 'Select one'} 
                id="read-status"
                onSelect={props.writeReadStatus.bind(null, props.index)}
                >
                <MenuItem eventKey="to-read">
                  TO-READ
                </MenuItem>
                <MenuItem eventKey="currently-reading">CURRENTLY-READING</MenuItem>
                <MenuItem eventKey="read">READ</MenuItem>
              </DropdownButton>
              <Button>OWNED</Button>
              <Button>WISHLIST</Button>
            </ButtonGroup>
            <Button bsStyle="link">DELETE BOOK</Button>
            </ButtonToolbar>
        </div>
      </div>
  </div>
  );
}

export default BookDetail;
