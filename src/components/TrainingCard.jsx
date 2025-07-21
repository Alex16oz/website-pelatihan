import React from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const TrainingCard = ({ training, session, canRegister }) => {
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    if (!session) {
      alert("Anda harus login untuk mendaftar.");
      navigate('/auth');
      return;
    }

    const isConfirmed = confirm(`Anda yakin ingin mendaftar untuk pelatihan "${training.title}"? Anda hanya bisa mendaftar satu kali.`);
    
    if (isConfirmed) {
      try {
        const { error: profileError } = await checkProfileCompletion(session.user.id);
        if (profileError) return;

        const { error } = await supabase
          .from('registrations')
          .insert({ user_id: session.user.id, training_id: training.id });

        if (error) throw error;
        
        alert(`Pendaftaran untuk "${training.title}" berhasil!`);
        window.location.reload(); // Refresh halaman untuk update UI
      } catch (error) {
        alert("Pendaftaran gagal: " + error.message);
      }
    }
  };
  
  // Fungsi untuk cek kelengkapan profil sebelum mendaftar
  const checkProfileCompletion = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('nama_lengkap, telepon, alamat')
      .eq('id', userId)
      .single();

    if (error || !data.nama_lengkap || !data.telepon || !data.alamat) {
      alert("Profil Anda belum lengkap. Silakan lengkapi data diri Anda di halaman profil sebelum mendaftar.");
      navigate('/profile');
      return { error: true };
    }
    return { error: false };
  }

  return (
    <div className="training-card">
      <img src={training.imageUrl} alt={training.title} className="card-img" />
      <div className="card-content">
        <h3>{training.title}</h3>
        <p>{training.shortDescription}</p>
        <div className="card-footer">
          <span className="price">{training.price}</span>
          {canRegister && (
            <button className="btn-register" onClick={handleRegisterClick}>
              Daftar Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;