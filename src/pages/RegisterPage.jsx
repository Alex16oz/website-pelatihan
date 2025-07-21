import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [files, setFiles] = useState({
    cv: null,
    ktp: null,
    ijazah: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles(prevFiles => ({ ...prevFiles, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Untuk saat ini, kita hanya tampilkan di console
    // Nantinya, data ini akan dikirim ke Supabase
    console.log("Data Pendaftar:", formData);
    console.log("Dokumen Terunggah:", files);
    alert('Pendaftaran berhasil! Silakan cek console log untuk melihat data.');
  };

  return (
    <div className="register-page">
      <h2>Formulir Pendaftaran Pelatihan</h2>
      <p>Silakan isi data diri Anda dengan lengkap dan benar.</p>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="fullName">Nama Lengkap</label>
          <input type="text" id="fullName" name="fullName" onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Alamat Email</label>
          <input type="email" id="email" name="email" onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Nomor Telepon</label>
          <input type="tel" id="phone" name="phone" onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Alamat Lengkap</label>
          <textarea id="address" name="address" rows="3" onChange={handleInputChange} required></textarea>
        </div>
        
        <hr />
        <h4>Unggah Dokumen</h4>

        <div className="form-group">
          <label htmlFor="cv">Curriculum Vitae (CV) (.pdf)</label>
          <input type="file" id="cv" name="cv" accept=".pdf" onChange={handleFileChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="ktp">Kartu Tanda Penduduk (KTP) (.jpg, .png)</label>
          <input type="file" id="ktp" name="ktp" accept="image/png, image/jpeg" onChange={handleFileChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="ijazah">Ijazah Terakhir (.pdf)</label>
          <input type="file" id="ijazah" name="ijazah" accept=".pdf" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="btn-submit">Submit Pendaftaran</button>
      </form>
    </div>
  );
};

export default RegisterPage;