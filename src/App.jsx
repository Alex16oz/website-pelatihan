import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Perhatikan path import di bawah ini, tidak lagi menggunakan .js
import HomePage from './pages/HomePage'; 
import RegisterPage from './pages/RegisterPage';
import './App.css';

// Simple Navbar component
function Navbar() {
  return (
    <nav style={{ background: '#333', padding: '15px 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>PelatihanKita</Link>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Beranda</Link>
        <Link to="/daftar" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Pendaftaran</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daftar" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;