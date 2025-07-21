import React, { useState, useEffect } from 'react';
import TrainingCard from './TrainingCard';
import { trainings } from '../data/mockTrainings';
import { supabase } from '../supabaseClient';

const TrainingList = ({ session }) => {
  const [userHasRegistered, setUserHasRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (!session) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase
          .from('registrations')
          .select('id')
          .eq('user_id', session.user.id)
          .single();
        
        if (data) {
          setUserHasRegistered(true);
        }
      } catch (error) {
        // Abaikan error jika tidak ada data (kode status 406)
        if (error.code !== 'PGRST116') {
          console.error('Error checking registration:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    checkUserRegistration();
  }, [session]);

  if (loading) {
    return <div>Memuat data pelatihan...</div>;
  }

  return (
    <div className="training-list-container">
      <h2>Pelatihan Tersedia</h2>
      {session && userHasRegistered && (
        <p style={{textAlign: 'center', color: 'green', fontWeight: 'bold'}}>
          Anda sudah terdaftar di salah satu pelatihan. Anda tidak dapat mendaftar lagi.
        </p>
      )}
      <div className="training-list">
        {trainings.map(training => (
          <TrainingCard 
            key={training.id} 
            training={training} 
            session={session}
            canRegister={!userHasRegistered} 
          />
        ))}
      </div>
    </div>
  );
};

export default TrainingList;