import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import { PARAMS } from './../constants/api-key';
import { DEFAULT_PHOTO } from '../constants/images';


class Venue extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo: DEFAULT_PHOTO,
      rating: 0,
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
        rating: 0,
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
        this.setState({
          photo,
          rating: info.rating,
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
    const { photo, rating, error} = this.state;
    const { name, location, onClickedVenue } = this.props;

    return (
      <div className="Venue" onClick={onClickedVenue}>
        <img className="Venue__image" src={photo} />
        <div className="Venue__info">
          <span className="Venue__info__header">
            <span className="Venue__info__header__rating">
              <FaStar color="yellow" ></FaStar>
              {rating}
            </span>
            <span className="Venue__info__header__title">{name}</span>
          </span>
          <span className="Venue__info__location">
            {location && `Address: ${location}`}
          </span>
        </div>
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
}

export default Venue;