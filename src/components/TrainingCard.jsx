import React from 'react';

// Menerima satu objek 'training' sebagai prop
const TrainingCard = ({ training }) => {
  return (
    <div className="training-card">
      <img src={training.imageUrl} alt={training.title} className="card-img" />
      <div className="card-content">
        <h3>{training.title}</h3>
        <p>{training.shortDescription}</p>
        <div className="card-footer">
          <span className="price">{training.price}</span>
          <button className="btn-register">Daftar Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;