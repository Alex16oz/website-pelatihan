import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { trainings } from '../data/mockTrainings';
import ProgressBar from '../components/ProgressBar';

// Total langkah dalam proses pendaftaran sekarang menjadi 4
const TOTAL_STEPS = 4;

const SequentialRegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nama_lengkap: '',
    telepon: '',
    alamat: '',
    training_id: null
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);

  // Fungsi untuk menangani setiap langkah
  const handleSubmitStep = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Langkah 1: Membuat Akun
    if (currentStep === 1) {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert("Error: " + error.message);
      } else if (data.user) {
        setUser(data.user);
        // Jika session null, berarti perlu konfirmasi email
        if (data.session === null) {
          nextStep(); // Lanjut ke halaman tunggu (Langkah 2)
        } else {
          // Jika ada session (konfirmasi otomatis), loncat ke isi profil (Langkah 3)
          setCurrentStep(3); 
        }
      }
    }

    // Langkah 2: Cek Konfirmasi Email
    if (currentStep === 2) {
      // Refresh user session untuk mendapatkan status terbaru
      const { data: { session }, error } = await supabase.auth.refreshSession();
      const refreshedUser = session?.user;

      if (refreshedUser && refreshedUser.email_confirmed_at) {
        setUser(refreshedUser);
        nextStep(); // Lanjut ke isi profil (Langkah 3)
      } else {
        alert("Email Anda belum dikonfirmasi. Silakan periksa kotak masuk dan klik tautan konfirmasi.");
      }
    }

    // Langkah 3: Mengisi Profil
    if (currentStep === 3) {
      if (!formData.nama_lengkap || !formData.telepon || !formData.alamat) {
        alert("Harap isi semua data diri.");
        setLoading(false);
        return;
      }
      nextStep(); // Lanjut ke pilih pelatihan (Langkah 4)
    }

    // Langkah 4: Pilih Pelatihan dan Submit Semua Data
    if (currentStep === 4) {
      if (!formData.training_id) {
        alert("Harap pilih salah satu pelatihan.");
        setLoading(false);
        return;
      }
      try {
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: user.id,
          nama_lengkap: formData.nama_lengkap,
          telepon: formData.telepon,
          alamat: formData.alamat,
          updated_at: new Date()
        });
        if (profileError) throw profileError;

        const { error: registrationError } = await supabase.from('registrations').insert({
          user_id: user.id,
          training_id: formData.training_id
        });
        if (registrationError) {
          if (registrationError.code === '23505') {
            throw new Error("Akun ini sudah terdaftar di sebuah pelatihan.");
          }
          throw registrationError;
        }
        nextStep(); // Lanjut ke halaman sukses
      } catch (error) {
        alert("Pendaftaran Gagal: " + error.message);
      }
    }
    setLoading(false);
  };
  
  return (
    <div className="register-page">
      <h2>Formulir Pendaftaran Pelatihan</h2>
      <ProgressBar currentStep={currentStep > TOTAL_STEPS ? TOTAL_STEPS : currentStep} totalSteps={TOTAL_STEPS} />
      
      <form onSubmit={handleSubmitStep}>
        {/* Step 1: Account Creation */}
        {currentStep === 1 && (
          <div>
            <h3>Langkah 1: Informasi Akun</h3>
            {/* ... input email dan password sama seperti sebelumnya ... */}
            <div className="form-group">
              <label htmlFor="email">Alamat Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password (minimal 6 karakter)</label>
              <input type="password" id="password" name="password" minLength="6" value={formData.password} onChange={handleInputChange} required />
            </div>
          </div>
        )}

        {/* Step 2: Menunggu Konfirmasi Email */}
        {currentStep === 2 && (
            <div style={{textAlign: 'center'}}>
                <h3>Langkah 2: Konfirmasi Email Anda</h3>
                <p>Kami telah mengirimkan tautan konfirmasi ke <strong>{formData.email}</strong>.</p>
                <p>Silakan periksa kotak masuk (dan folder spam) Anda, lalu klik tautan tersebut untuk melanjutkan.</p>
                <p>Setelah email dikonfirmasi, klik tombol di bawah ini.</p>
            </div>
        )}

        {/* Step 3: Personal Details */}
        {currentStep === 3 && (
          <div>
            <h3>Langkah 3: Data Diri</h3>
            {/* ... input data diri sama seperti sebelumnya ... */}
            <div className="form-group">
              <label htmlFor="nama_lengkap">Nama Lengkap</label>
              <input type="text" id="nama_lengkap" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="telepon">Nomor Telepon</label>
              <input type="tel" id="telepon" name="telepon" value={formData.telepon} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="alamat">Alamat Lengkap</label>
              <textarea id="alamat" name="alamat" rows="3" value={formData.alamat} onChange={handleInputChange} required></textarea>
            </div>
          </div>
        )}

        {/* Step 4: Training Selection */}
        {currentStep === 4 && (
           <div>
             <h3>Langkah 4: Pilih Pelatihan</h3>
             {/* ... pilihan pelatihan sama seperti sebelumnya ... */}
             <div className="training-selection-list">
                {trainings.map(training => (
                  <div key={training.id} className="form-group-radio">
                      <input type="radio" id={`training-${training.id}`} name="training_id" value={training.id} checked={formData.training_id == training.id} onChange={handleInputChange}/>
                      <label htmlFor={`training-${training.id}`}>
                        <strong>{training.title}</strong> - <span>{training.price}</span>
                        <p>{training.shortDescription}</p>
                      </label>
                  </div>
                ))}
             </div>
           </div>
        )}

        {/* Success Message */}
        {currentStep > TOTAL_STEPS && (
            <div style={{textAlign: 'center'}}>
                <h3>Pendaftaran Selesai!</h3>
                <p>Terima kasih. Anda telah berhasil terdaftar pada pelatihan yang Anda pilih.</p>
            </div>
        )}
        
        {/* Navigation Buttons */}
        {currentStep <= TOTAL_STEPS && (
           <button type="submit" className="btn-submit" disabled={loading}>
              {loading && 'Memproses...'}
              {!loading && currentStep === 1 && 'Daftar & Lanjut'}
              {!loading && currentStep === 2 && 'Saya Sudah Konfirmasi, Lanjutkan'}
              {!loading && currentStep === 3 && 'Lanjut'}
              {!loading && currentStep === 4 && 'Submit Pendaftaran'}
            </button>
        )}
      </form>
    </div>
  );
};

export default SequentialRegisterPage;