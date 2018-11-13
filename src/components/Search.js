import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="Search">
        <input
          id="venueType"
          onChange={this.handleChange}
          value={this.state.value}
          placeholder="search for venues" />
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default Search;