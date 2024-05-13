import React from 'react';

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  const starStyles = {
    fontSize: '1rem', // Taille de la police pour les étoiles
  };

  return (
    <div className="rating flex items-center">
      {stars.map((star) => (
        <React.Fragment key={star}>
          <input
            className="hidden"
            value={star}
            name="rate"
            id={`star${star}`}
            type="radio"
            checked={star === value}
            onChange={() => onChange(star)}
          />
          <label
            htmlFor={`star${star}`}
            className={`cursor-pointer ${starStyles} ${
              star <= value ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StarRating;
