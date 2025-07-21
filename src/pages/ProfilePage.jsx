import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ProfilePage = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { user } = session.user;

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`nama_lengkap, telepon, alamat`)
          .eq('id', session.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setFullName(data.nama_lengkap || '');
          setPhone(data.telepon || '');
          setAddress(data.alamat || '');
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = session.user;

      const updates = {
        id: session.user.id,
        nama_lengkap: fullName,
        telepon: phone,
        alamat: address,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Lengkapi Data Diri Anda</h2>
      <p>Data ini diperlukan untuk verifikasi kelayakan pelatihan.</p>
      <form onSubmit={updateProfile} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Nama Lengkap</label>
          <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Nomor Telepon</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Alamat Lengkap</label>
          <textarea id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Profil'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;