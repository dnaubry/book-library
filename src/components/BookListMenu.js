import React from 'react';
import PropTypes from 'prop-types';

class BookListMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewExpanded: true,
      sortExpanded: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const viewExpanded = !this.state.viewExpanded;
    const sortExpanded = !this.state.sortExpanded;

    this.setState({ viewExpanded, sortExpanded });
  }

  render() {
    const props = this.props;
    const options = ['all', 'to-read', 'reading', 'have-read'];
    const sortOptions = ['added', 'title', 'author'];
   
    return (
      <div className='book-list-menu'>
        <div className='query-options'>
          <button className='btn-black option-btn-header' onClick={this.handleClick}>
            View
          </button>
          <div className={this.state.viewExpanded === true 
            ? 'menu-options'
            : 'menu-options menu-options-hidden'}>
            {options.map(option => {
              return (
                <button
                  key={option}
                  value={option}
                  className={option === props.query
                    ? 'btn-white option-btn active' : 'btn-white option-btn'}
                  onClick={event => props.queryBooks(event)}>
                  {option}
                </button>
              )
            })}
          </div>
        </div>
        <div className='sort-options'>
          <button className='btn-black option-btn-header' onClick={this.handleClick}>
            Sort
          </button>
          <div className={this.state.sortExpanded === true
            ? 'menu-options'
            : 'menu-options menu-options-hidden'}>
            {sortOptions.map(option => {
              return (
                <button
                  key={option}
                  value={option}
                  className={option === props.sort
                    ? 'btn-white option-btn active sort' : 'btn-white option-btn'}
                  onClick={event => props.sortBooks(event)}>
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

BookListMenu.propTypes = {
  query: PropTypes.string.isRequired,
  queryBooks: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  sortBooks: PropTypes.func.isRequired
}

export default BookListMenu;