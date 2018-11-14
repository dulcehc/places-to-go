import React, { Component } from 'react';
import { FaHeart } from 'react-icons/fa';
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
        <img className="Venue__image" src={photo} />
        <span className="Venue__title">{name}</span>
        <span className="Venue__location">{location}</span>
        <span className="Venue__social">

        <FaHeart color='red' size='1.5rem'></FaHeart>
        {likes}
        </span>
      </div>
    );
  }
}

export default Venue;