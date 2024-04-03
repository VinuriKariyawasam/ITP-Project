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
        <div key={index} className="star-container">
        <FaStar
          key={index}
          className={index < rating ? 'star-filled' : 'star-outline'}
          onClick={() => handleStarClick(index)}
          size={20}
        />
          {index < rating && <div className="progress-bar" style={{ width: `${((index + 1) * 20)}%` }}></div>}
        </div>
      ))}

      <p className='star-text'>{rating} out of 5 stars</p>
    </div>
  );
};

export default StarRating;
