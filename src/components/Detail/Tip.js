import React from 'react';

const Tip = ({ tip }) => {
  return (
    <div className="Tip">
      <span className="Tip__user">
        <img src={`${tip.user.photo.prefix}original${tip.user.photo.suffix}`} />
        <span className="Tip__user__name">
          {tip.user.firstName}
        </span>
        <span className="Tip__user__text">
          {tip.text}
        </span>
      </span>

    </div>
  );
};

export default Tip;