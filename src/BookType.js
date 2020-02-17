import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OptionsMenu from './OptionsMenu';

class BookType extends Component {

  static propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired,
  }

  render() {
    const { shelf, books, onMove } = this.props;
    const booksOnThisShelf = books.filter(book => book.shelf === shelf.key);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThisShelf.map(book => (
              <li key={book.id} >
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <OptionsMenu
                      onMove={onMove}
                      book={book} 
                      shelf={shelf} 
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookType
