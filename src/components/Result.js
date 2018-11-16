import React from 'react';
import Venue from './Venue';

const Result = ({ results, onSelected }) => {
  const handleVenue = id => {
    onSelected(id);
  }

  return (
    <div className="Result">
      { results.map((item, i) =>
        <Venue key={i}
          name={item.venue.name}
          location={item.venue.location.address}
          id={item.venue.id}
          onClickedVenue={()=>handleVenue(item.venue.id)}
        />
      )}
    </div>
  );
};

export default Result;