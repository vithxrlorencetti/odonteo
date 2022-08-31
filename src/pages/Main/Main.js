import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const [chargingInformation, setChargingInformation] = useState({});
  const [validInformation, setValidInformation] = useState(false);

  const navigate = useNavigate();

  function handleChange({ target: { name, value } }) {
    setChargingInformation((oldState) => {
      return ({
        ...oldState,
        [name]: value,
      });
    });
  }

  return (
    <main>
      <form>
        <label htmlFor='amount'>
          Quantia a receber:
          <input
            id='amount'
            className='form-input'
            name='paymentAmount'
            type='number'
            placeholder='ex. 3500.50'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='installments'>
          Número de parcelas:
          <input
            id='installments'
            className='form-input'
            name='numberOfInstallments'
            type='number'
            placeholder='ex. 2'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='billing-day'>
          Dia do mês para cobrança:
          <input
            id='billing-day'
            className='form-input'
            name='billingDay'
            type='number'
            placeholder='ex. 15'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='first-installment-date'>
          Data da primeira parcela:
          <input
            id='first-installment-date'
            className='form-input'
            name='firstInstallmentDate'
            type='date'
            placeholder='dd-mm-yyyy'
            onChange={handleChange}
          />
        </label>
        <button
          type='button'
          className='main-page-button'
          id='register-button'
          onClick={() => console.log(chargingInformation)}
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
