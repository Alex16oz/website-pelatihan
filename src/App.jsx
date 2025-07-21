import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; //
import HomePage from './pages/HomePage'; //
// import LoginPage from './pages/LoginPage'; // Buat halaman login terpisah jika perlu
import SequentialRegisterPage from './pages/SequentialRegisterPage';
import './App.css'; //

// Navbar component (bisa disederhanakan)
function Navbar({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav style={{ background: '#333', padding: '15px 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>PelatihanKita</Link>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Beranda</Link>
        {session ? (
            <button onClick={handleLogout} className="btn-primary" style={{ margin: 0 }}>Logout</button>
        ) : (
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Daftar Pelatihan</Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar session={session} />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage session={session} />} />
          <Route path="/register" element={!session ? <SequentialRegisterPage /> : <Navigate to="/" />} />
          {/* Tambahkan route untuk login jika perlu */}
          {/* <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;