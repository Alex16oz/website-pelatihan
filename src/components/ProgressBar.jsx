import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  // Pastikan currentStep tidak melebihi totalSteps untuk kalkulasi persentase
  const stepForCalc = Math.min(currentStep, totalSteps);
  const percentage = (stepForCalc / totalSteps) * 100;
  
  const progressBarStyle = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginBottom: '30px'
  };

  const fillerStyle = {
    height: '10px',
    width: `${percentage}%`,
    backgroundColor: '#007bff',
    borderRadius: 'inherit',
    textAlign: 'center',
    transition: 'width 0.2s ease-in-out'
  };

  return (
    <div>
      <p style={{textAlign: 'center'}}>
        {currentStep > totalSteps ? 'Pendaftaran Selesai' : `Langkah ${currentStep} dari ${totalSteps}`}
      </p>
      <div style={progressBarStyle}>
        <div style={fillerStyle}></div>
      </div>
    </div>
  );
};

export default ProgressBar;