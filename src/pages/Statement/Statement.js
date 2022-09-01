import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { handleChange } from '../../utils/handleChange';
import './Statement.css';

function Statement() {
  const [datesOfStatement, setDatesOfStatement] = useState({});
  const navigate = useNavigate();
  const chargingInformation = [JSON.parse(localStorage.getItem('chargingInformation'))];

  function showStatement() {
    
  }

  return (
    <main>
      <form>
        <label htmlFor='beginning-date'>
          Data de início:
          <input
            className='form-input date'
            id='beginning-date'
            name='beginningDate'
            type='date'
            onChange={(e) => handleChange(e, setDatesOfStatement)}
          />
        </label>
        <label htmlFor='beginning-date'>
          Data de fim:
          <input
            className='form-input date'
            id='ending-date'
            name='endingDate'
            type='date'
            onChange={(e) => handleChange(e, setDatesOfStatement)}
          />
        </label>
        <Button
          addClassName='form-button'
          onClickFunction={showStatement}
        >
          Consultar faturamento
        </Button>
      </form>
      <Button
        id='go-back-button'
        onClickFunction={() => navigate('/')}
      >
        Voltar
      </Button>
    </main>
  );
}

export default Statement;
