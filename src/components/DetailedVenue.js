import React, { Component } from 'react';
import { DEFAULT_PHOTO } from '../constants/images';
import { CLIENT_ID, CLIENT_SECRET } from './../constants/api-key';

const params = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  v: '20181112',
}

class DetailedVenue extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo: DEFAULT_PHOTO,
      contact: [],
      location: '',
      likes: 0,
      description: '',
      url: '',
      status: ''
    }
  }

  componentDidMount() {
    this.getInformation(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        photo: DEFAULT_PHOTO,
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
        console.log('info: ', info);
        this.setState({
          photo: `${info.bestPhoto.prefix}original${info.bestPhoto.suffix}` || DEFAULT_PHOTO,
          contact: info.contact,
          location: info.location.address,
          likes: info.likes.count,
          url: info.shortUrl,
          status: info.popular.status,
          tip: {
            text: info.tips.groups[0].items[0].text,
            user: `${info.tips.groups[0].items[0].user.firstName} ${info.tips.groups[0].items[0].user.lastName}`,
          }
        });
      })
      .catch(error => {
        console.log('Error: ', error)
    });
  }
  render() {
    console.log('props', this.state);
    const { photo, contact, location, likes, url, status, tip} = this.state;
    return (
      <div className="DetailedVenue">
        <img src={photo} />
        Location: {location}
        likes: {likes}
        url: {url}
        status: {status}
      </div>
    );
  }
}

export default DetailedVenue;