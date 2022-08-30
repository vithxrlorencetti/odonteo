import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {

  const navigate = useNavigate();

  return (
    <main>
      <form>
        <label htmlFor='amount'>
          Quantia a ser paga:
          <input
            id='amount'
            className='form-input'
            name='payment-amount'
            type='number'
            placeholder='ex. 3500.50'
          />
        </label>
        <label htmlFor='installments'>
          Número de parcelas:
          <input
            id='installments'
            className='form-input'
            name='number-of-installments'
            type='number'
            placeholder='ex. 2'
          />
        </label>
        <label htmlFor='billing-day'>
          Dia do mês para cobrança:
          <input
            id='billing-day'
            className='form-input'
            name='billing-day'
            type='number'
            placeholder='ex. 15'
          />
        </label>
        <button
          type='button'
          className='main-page-button'
          id='register-button'
        >
          Registrar cobrança
        </button>
      </form>
      <button
        type='button'
        className='main-page-button'
        id='extract-button'
        onClick={() => navigate('/extract')}
      >
        Ver extrato
      </button>
    </main>
  );
}

export default Main;
