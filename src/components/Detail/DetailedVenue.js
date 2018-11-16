import React, { Component } from 'react';
import { FaMapMarkedAlt, FaThumbsUp } from 'react-icons/fa';
import { DEFAULT_PHOTO } from '../../constants/images';
import { PARAMS } from '../../constants/api-key';
import Tip from './Tip';
import SocialMedia from './SocialMedia';


class DetailedVenue extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo: DEFAULT_PHOTO,
      name: '',
      location: '',
      likes: 0,
      url: '',
      tip: [],
      error: ''
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
        tip: [],
        error: ''
      });
      this.getInformation(nextProps.id);
    }
  }
  getInformation = id => {
    const endpoint = `https://api.foursquare.com/v2/venues/${id}?`;
    fetch(endpoint + new URLSearchParams(PARAMS), {
      method: 'GET'
    }).then(response => response.json())
      .then(res => {
        const info = res.response.venue;
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
          error: ''
        });
      })
      .catch(error => {
        this.setState({
          error: 'The information can\'t be displayed'
        });
    });
  }
  render() {
    const { photo, name, category, location, likes, url, tip, error} = this.state;

    return (
      <div className="DetailedVenue">
        <img className="DetailedVenue__img" src={photo} />
        {!error ?
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
          :
          <span className="error">{error}</span>
        }
      </div>
    );
  }
}

export default DetailedVenue;