import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import "./StarRating.css";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="cam-star-container">
        <FaStar
          key={index}
          className={index < rating ? 'cam-star-filled' : 'cam-star-outline'}
          onClick={() => handleStarClick(index)}
          size={20}
        />
          {index < rating && <div className="cam-progress-bar" style={{ width: `${((index + 1) * 20)}%` }}></div>}
        </div>
      ))}

      <p className='cam-star-text'>{rating} out of 5 stars</p>
    </div>
  );
};

export default StarRating;
