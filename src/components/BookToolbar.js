import React from 'react';

class BookToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false
    }

    this.toggleOptions = this.toggleOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  handleClick(status) {
    this.props.writeBookStatus.call(null, this.props.index, status);
    this.setState({ showOptions: false });
  }

  render() {
    const options = ['to-read', 'reading', 'have-read'];
    return (
      <div className='book-toolbar'>
        <div className='book-toolbar-main'>
          <button className='btn-white header-btn' onClick={this.toggleOptions}>
            {this.props.book.status ? this.props.book.status : 'select one'}<span>&#9660;</span>
          </button>
          <button
            className='btn-white delete-btn'
            onClick={this.props.deleteBook.bind(null, this.props.index)}>
              Delete Book
          </button>
        </div>
        {this.state.showOptions &&
            <div className='book-toolbar-options'>
            {options.map(status => {
              return (<button
                className='btn-white option-btn'
                key={status}
                onClick={this.handleClick.bind(null, status)}>
                {status}
              </button>)
            })}
          </div>
          }
      </div>
    )
  }
}

export default BookToolbar;
