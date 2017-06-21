import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      results: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.id;
    const input = document.getElementById(id);
    input.focus();
  }

  handleChange(event) {
    var value = event.target.value;

    this.setState(function() {
      return {
        term: value
      }
    })
  }

  handleSubmit(event, term) {
    event.preventDefault();
    this.props.onSearchSubmit(term);
}

  render() {
    return (
      <form 
        className='search-form' 
        onSubmit={event => this.handleSubmit(event, this.state.term)}>
        <label className='search-form-label' htmlFor='search'>
          Search by book title or author name
        </label>
        <input
          id={this.props.id}
          type='text'
          autoComplete='off'
          value={this.state.term}
          onChange={this.handleChange} 
          />
          <button
            className='search-form-button'
            type='submit'
            disabled={!this.state.term}>
            Search
            </button>
            <p>Search powered by <a href='https://goodreads.com' target='_blank' rel="noopener noreferrer"> Goodreads</a></p>
        </form>
    )
  }
}

SearchForm.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default SearchForm;
