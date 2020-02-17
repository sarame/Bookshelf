import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookType from './BookType';


class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    bookshelves: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired,
  }

  render() {
    const { bookshelves, books, onMove } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map(shelf => (
              <BookType
                key={shelf.key}
                shelf={shelf}
                books={books}
                onMove={onMove}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
            <button>Add a Book</button>
          </Link>
        </div>
      </div>)
  }
}

export default ListBooks
