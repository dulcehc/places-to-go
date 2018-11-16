import React, { Component } from 'react';
import { CLIENT_ID, CLIENT_SECRET } from './../constants/api-key';
import Search  from './Search';
import Result from './Result';
import DetailedVenue from './Detail/DetailedVenue';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      latlong: '',
      id: '',
      error: ''
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
      this.setState({
        latlong: `${response.coords.latitude},${response.coords.longitude}`
      });
    }, err => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    });
  }

  getVenues = (query, location='') => {
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      limit: 4,
      query,
      v: '20181112',
      ll: this.state.latlong,
      near: location
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json())
      .then(response => {
        console.log(response.response.groups[0].items);
        this.setState({
          venues: response.response.groups[0].items,
          id: '',
          error: ''
        });
      })
      .catch(error => {
        this.setState({
          venues: [],
          error
        });
    });
  }

  handleSelectionVenue = id => {
    this.setState({
      id,
    });
  };

  render() {
    const { venues, error, id } = this.state;
    const message = error ? 'No results found' : '';

    return (
      <div className="App">
        <Search onSubmit={(query, location)=>this.getVenues(query, location)}/>
        <div className="App__container">
          { venues.length > 0 ?
              <Result
                results={venues}
                onSelected={this.handleSelectionVenue}
              />

            : <span>{message}</span>
          }
          {id && <DetailedVenue id={id} />}
        </div>
      </div>
    );
  }
}

export default App;
