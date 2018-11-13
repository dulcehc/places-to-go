import React, { Component } from 'react';
import { CLIENT_ID, CLIENT_SECRET } from './../constants/api-key';
import Venue from './Venue';
import Search  from './Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      latlong: ''
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
      this.setState({
        latlong: `${response.coords.latitude},${response.coords.longitude}`
      }, () => {
        this.getVenues();
      });
    }, err => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    });
  }

  getVenues = query => {
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      limit: 5,
      query,
      v: '20181112',
      ll: this.state.latlong
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json()).then(response => {
      console.log(response.response.groups[0].items);
      this.setState({venues: response.response.groups[0].items});
    });

  }

  render() {
    let venueList = this.state.venues.map((item, i) =>
      <Venue key={i}
          name={item.venue.name}
          location={item.venue.location.address}
      />
    );

    return (
      <div className="App">
        <Search onSubmit={(query)=>this.getVenues(query)}/>
        <ul>
          {venueList}
        </ul>
      </div>
    );
  }
}

export default App;
