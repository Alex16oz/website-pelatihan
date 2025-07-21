import React from 'react';
import TrainingCard from './TrainingCard';
import { trainings } from '../data/mockTrainings'; // Import data sampel

const TrainingList = () => {
  return (
    <div className="training-list-container">
      <h2>Pelatihan Tersedia</h2>
      <div className="training-list">
        {trainings.map(training => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
};

export default TrainingList;