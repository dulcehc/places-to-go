import React, { Component } from 'react';
import { CLIENT_ID, CLIENT_SECRET } from './../constants/api-key';

const params = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  v: '20181112',
}

class Venue extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo: '',
      likes: 0
    }
  }

  componentDidMount() {
    this.getPhoto(this.props.id);
    this.getLikes(this.props.id);
  }

  getPhoto = id => {
    const photosEndpoint = `https://api.foursquare.com/v2/venues/${id}/photos?`;
    fetch(photosEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json())
      .then(res => {
        const url = res.response.photos.items[0];
        this.setState({
          photo: `${url.prefix}original${url.suffix}`,
        });
      })
      .catch(error => {
        console.log('Error: ', error)
    });
  }

  getLikes = id => {
    const likesEndpoint = `https://api.foursquare.com/v2/venues/${id}/likes?`;
    fetch(likesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json())
      .then(res => {
       this.setState({
          likes: res.response.likes.count,
        });
      })
      .catch(error => {
        console.log('Error: ', error)
    });
  }


  render() {
    const { photo, likes } = this.state;
    const { name, location } = this.props;

    return (
      <div className="Venue">
        <h1>{name} </h1>
        <span>{likes}</span>
        <span>{location}</span>
        <img src={photo} />

      </div>
    );
  }
}

export default Venue;