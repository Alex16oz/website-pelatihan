import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Impor klien Supabase

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kirim data pendaftar ke tabel Supabase
    const { data, error } = await supabase
      .from('pendaftar') // Pastikan nama tabel sudah benar
      .insert([
        { 
          nama_lengkap: formData.fullName, 
          email: formData.email,
          telepon: formData.phone,
          alamat: formData.address,
        },
      ]);

    if (error) {
      console.error('Error submitting data:', error);
      alert('Pendaftaran gagal. Silakan coba lagi.');
    } else {
      console.log("Data Pendaftar Berhasil Disimpan:", data);
      alert('Pendaftaran berhasil!');
      // Kosongkan form setelah berhasil
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
      });
      e.target.reset();
    }
  };

  return (
    <div className="register-page">
      <h2>Formulir Pendaftaran Pelatihan</h2>
      <p>Silakan isi data diri Anda dengan lengkap dan benar.</p>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="fullName">Nama Lengkap</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Alamat Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Nomor Telepon</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Alamat Lengkap</label>
          <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleInputChange} required></textarea>
        </div>

        <button type="submit" className="btn-submit">Submit Pendaftaran</button>
      </form>
    </div>
  );
};

export default RegisterPage;