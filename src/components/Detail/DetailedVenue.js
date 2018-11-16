import React, { Component } from 'react';
import { FaMapMarkedAlt, FaThumbsUp } from 'react-icons/fa';
import { DEFAULT_PHOTO } from '../../constants/images';
import { CLIENT_ID, CLIENT_SECRET } from '../../constants/api-key';
import Tip from './Tip';
import SocialMedia from './SocialMedia';

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
      name: '',
      location: '',
      likes: 0,
      url: '',
      tip: {}
    }
  }

  componentDidMount() {
    this.getInformation(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        photo: DEFAULT_PHOTO,
        name: '',
        category: [],
        location: '',
        likes: 0,
        url: '',
        tip: []
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
        console.log('info: ', info)
        const photo = info.photos.count === 0 ? DEFAULT_PHOTO
                      : `${info.bestPhoto.prefix}original${info.bestPhoto.suffix}`;
        const location = info.location.hasOwnProperty('address') ? info.location.address : '';
        const tip =  info.tips.count === 0 ? [] : info.tips.groups[0].items[0];
        this.setState({
          name: info.name,
          category: info.categories[0],
          photo,
          location,
          likes: info.likes.count,
          url: info.shortUrl,
          tip,
        });
      })
      .catch(error => {
        console.log('Error: ', error)
    });
  }
  render() {
    const { photo, name, category, location, likes, url, tip} = this.state;
    console.log('category: ', category);
    return (
      <div className="DetailedVenue">
        <img className="DetailedVenue__img" src={photo} />
        <div className="DetailedVenue__info">
          <span className="DetailedVenue__info__name">{name}</span>
          {category &&
            <span className="DetailedVenue__info__cat">
              {category.hasOwnProperty('icon') &&  <img src={`${category.icon.prefix}bg_32${category.icon.suffix}`} /> }
              {category.name}
            </span>
          }
          {location &&
            <span className="DetailedVenue__info__location">
              <FaMapMarkedAlt color="green"/> {location}
            </span>
          }
          <span className="DetailedVenue__info__liked">
            <FaThumbsUp color="blue" />{likes}
          </span>
          {url &&  <SocialMedia url={url}  />}
          {Object.keys(tip).length > 0 && <Tip tip={tip} />}

        </div>
      </div>
    );
  }
}

export default DetailedVenue;