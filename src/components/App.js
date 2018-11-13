import React, { Component } from 'react';
import { CLIENT_ID, CLIENT_SECRET } from './../constants/api-key';
import Search  from './Search';
import Result from './Result';

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
    const { venues } = this.state;
    return (
      <div className="App">
        <Search onSubmit={(query)=>this.getVenues(query)}/>
        {venues.length > 0 ? <Result results={venues} /> : ''}
      </div>
    );
  }
}

export default App;
