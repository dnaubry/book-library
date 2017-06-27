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
          Search by title, author, or ISBN
        </label>
        <input
          autoFocus
          id={this.props.id}
          type='text'
          autoComplete='off'
          value={this.state.term}
          onChange={this.handleChange} 
          />
          <button
            className='btn-black search-form-btn'
            type='submit'
            disabled={!this.state.term}>
            Search
            </button>
        </form>
    )
  }
}

SearchForm.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default SearchForm;
