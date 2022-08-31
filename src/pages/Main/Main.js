import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const [chargingInformation, setChargingInformation] = useState({});
  const navigate = useNavigate();

  function handleChange({ target: { name, value } }) {
    setChargingInformation((oldState) => {
      return ({
        ...oldState,
        [name]: value,
      });
    });
  }

  function isInformationValid() {
    const {
      paymentAmount,
      numberOfInstallments,
      billingDay,
      firstInstallmentDate
    } = chargingInformation;

    const validAmount = parseFloat(paymentAmount) > 0;
    const validInstallmentNum = parseInt(numberOfInstallments, 10) > 0 && Number.isInteger(Number(numberOfInstallments));
    let validBillingDay = parseInt(billingDay, 10) > 0 && parseInt(billingDay, 10) < 32 && Number.isInteger(Number(billingDay));
    const validInstallmentDate = firstInstallmentDate && parseInt(firstInstallmentDate.split('-')[0], 10) >= 1960;

    if (numberOfInstallments === '1') {
      validBillingDay = true;
    }

    return validAmount && validInstallmentNum && validInstallmentDate && validBillingDay;
  }

  function register() {
    if (isInformationValid()) {
      console.log(chargingInformation);
    } else {
      console.log('Formato incorreto');
    }
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
            disabled={chargingInformation.numberOfInstallments === '1'}
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
          onClick={register}
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
