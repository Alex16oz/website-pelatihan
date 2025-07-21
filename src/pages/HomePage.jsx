import React from 'react';
import TrainingList from '../components/TrainingList';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Tingkatkan Skill Anda Bersama Kami</h1>
        <p>Pilih dari beragam pelatihan teknologi terbaik yang dirancang untuk masa depan karir Anda.</p>
        <button className="btn-primary">Lihat Semua Pelatihan</button>
      </div>
      <TrainingList />
    </div>
  );
};

export default HomePage;