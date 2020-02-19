import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OptionsMenu extends Component {
  state = {
    value: this.props.shelf
  };

  static propTypes = {
    book: PropTypes.object.isRequired,
    onMove: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
    this.props.onMove(this.props.book, value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default OptionsMenu
