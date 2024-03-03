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
        <FaStar
          key={index}
          className={index < rating ? 'star-filled' : 'star-outline'}
          onClick={() => handleStarClick(index)}
        />
      ))}
      <p className='star-text'>{rating} out of 5 stars</p>
    </div>
  );
};

export default StarRating;