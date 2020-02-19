import React, { Component } from 'react';
import SearchResults from './SearchResults';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      this.props.onSearch(val);
    });
  };

  render() {
    const {
      searchBooksData,
      myBooks,
      onResetSearch,
      onMove
    } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={onResetSearch}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.value}
              placeholder="Search by title or author"
              onChange={this.handleChange}
              autoFocus
            />
          </div>
        </div>
        <SearchResults
          searchBooksData={searchBooksData}
          myBooks={myBooks}
          onMove={onMove}
        />
      </div>
    );
  }
}

export default SearchBooks;
