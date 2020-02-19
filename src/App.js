import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import * as BooksAPI from './BooksAPI';
import './App.css';

const bookshelves = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];

class BooksApp extends Component {

  state = {
    myBooks: [],
    searchBooksData: [],
    error: false
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ myBooks: books });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });
    if (shelf === 'none') {
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };

  searchForBooks = (query) => {
    
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooksData: [] });
        } else {
          this.setState({ searchBooksData: books });
        }
      });
    } else {
      this.setState({ searchBooksData: [] });
    }
  }

  resetSearch = () => {
    this.setState({ searchBooksData: [] });
  };


  render() {
    const { myBooks, searchBooksData, error } = this.state;
    if (error) {
      return <div>Network error. Please try again later.</div>;
    }

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            bookshelves={bookshelves}
            books={myBooks}
            onMove={this.moveBook}
          />
        )} />
        
        <Route
          path="/search"
          render={() => (
            <SearchBook
            searchBooksData={searchBooksData}
              myBooks={myBooks}
              onSearch={this.searchForBooks}
              onMove={this.moveBook}
              onResetSearch={this.resetSearch}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
