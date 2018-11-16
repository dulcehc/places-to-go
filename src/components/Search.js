import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      venue: '',
      location: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.venue, this.state.location);
  }

  handleVenue = e => {
    this.setState({
      venue: e.target.value
    });
  }

  handleLocation = e => {
    this.setState({
      location: e.target.value
    });
  }

  render() {
    return (
      <div className="Search">
        <input
          id="venueType"
          onChange={this.handleVenue}
          value={this.state.venue}
          placeholder="venue"
          className="Search__venue"
          autocomplete="off"
        />
        <input
          id="venueLocation"
          onChange={this.handleLocation}
          value={this.state.location}
          placeholder="location"
          className="Search__location"
        />
        <button className="Search__btn"
          onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default Search;