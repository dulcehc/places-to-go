import React from 'react';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  GooglePlusShareButton, GooglePlusIcon
} from 'react-share';

const SocialMedia = ({ url, photo }) => {
  const size = 32;
  return (
    <div className="SocialMedia">
      <TwitterShareButton url={url} ><TwitterIcon size={size} /></TwitterShareButton>
      <FacebookShareButton url={url} ><FacebookIcon size={size} /></FacebookShareButton>
      <GooglePlusShareButton url={url} ><GooglePlusIcon size={size} /></GooglePlusShareButton>
    </div>
  );
};


export default SocialMedia;