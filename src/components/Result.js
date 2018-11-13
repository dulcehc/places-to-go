import React from 'react';
import Venue from './Venue';

const Result = ({ results }) => {
  return (
    <div className="Result">
      { results.map((item, i) =>
        <Venue key={i}
          name={item.venue.name}
          location={item.venue.location.address}
        />
      )}
    </div>
  );
};

export default Result;