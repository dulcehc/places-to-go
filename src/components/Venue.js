import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import { CLIENT_ID, CLIENT_SECRET } from './../constants/api-key';
import { DEFAULT_PHOTO } from '../constants/images';

const params = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  v: '20181112',
}

class Venue extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo: DEFAULT_PHOTO,
      rating: 0
    }
  }

  componentDidMount() {
    this.getInformation(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        photo: DEFAULT_PHOTO,
        rating: 0
      });
      this.getInformation(nextProps.id);
    }
  }
  getInformation = id => {
    const endpoint = `https://api.foursquare.com/v2/venues/${id}?`;
    fetch(endpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json())
      .then(res => {
        const info = res.response.venue;
        this.setState({
          photo: `${info.bestPhoto.prefix}original${info.bestPhoto.suffix}` || DEFAULT_PHOTO,
          rating: info.rating
        });
      })
      .catch(error => {
        console.log('Error: ', error)
    });
  }

  render() {
    const { photo, rating } = this.state;
    const { name, location } = this.props;

    return (
      <div className="Venue">
        <img className="Venue__image" src={photo} />
        <span className="Venue__title">{name}</span>
        <span className="Venue__location">
          {location && `Address: ${location}`}
        </span>
        <span className="Venue__social">
          <FaStar color='yellow' size='1.5rem'></FaStar>
          {rating}
        </span>
      </div>
    );
  }
}

export default Venue;