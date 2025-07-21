import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // Proses Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert('Error: ' + error.message);
    } else {
      // Proses Registrasi
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert('Error: ' + error.message);
      } else {
        alert('Registrasi berhasil! Cek email Anda untuk konfirmasi.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="register-page" style={{ maxWidth: '400px' }}>
      <h2>{isLogin ? 'Login' : 'Buat Akun Baru'}</h2>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="email">Alamat Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Memproses...' : (isLogin ? 'Login' : 'Daftar')}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
        <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
          {isLogin ? 'Daftar di sini' : 'Login di sini'}
        </a>
      </p>
    </div>
  );
};

export default AuthPage;