import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Extract.css';

function Extract() {
  const navigate = useNavigate();

  return (
    <main>
      <button
        type='button'
        className='main-page-button'
        id='extract-button'
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </main>
  );
}

export default Extract;
